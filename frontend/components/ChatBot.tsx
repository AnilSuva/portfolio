"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Trash2,
  Minus,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import { personalInfo } from "@/data/portfolio";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
  isError?: boolean;
}

const QUICK_PROMPTS = [
  "🚀 What are Anil's top projects?",
  "🛠️ What tech stack does Anil use?",
  "🎓 Tell me about Anil's education",
  "📬 How can I contact Anil for work?",
];

let counter = 0;
function createMessageId(prefix: string): string {
  counter += 1;
  return `${prefix}-${counter}-${Date.now()}`;
}

function getFormattedTime(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

const INITIAL_MESSAGE: Message = {
  id: "welcome-msg",
  role: "model",
  text: "Hi There!, you can ask questions about Anil's skills and projects.",
  timestamp: "Just now",
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);
  const [hasUnreadPrompt, setHasUnreadPrompt] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const streamTargetRef = useRef("");
  const isStreamingRef = useRef(false);
  const currentDisplayedRef = useRef("");

  const openChat = () => {
    setIsOpen(true);
    setShowNotificationBadge(false);
    setHasUnreadPrompt(false);
  };

  const toggleChat = () => {
    if (!isOpen) {
      openChat();
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen, streamingMessageId]);

  // Listen for global custom event to open chat from any component
  useEffect(() => {
    const handleOpenChat = () => {
      openChat();
    };

    window.addEventListener("open-portfolio-chat", handleOpenChat);
    return () => window.removeEventListener("open-portfolio-chat", handleOpenChat);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading || streamingMessageId) return;

    const userMessage: Message = {
      id: createMessageId("user"),
      role: "user",
      text,
      timestamp: getFormattedTime(),
    };

    // Add user message to state
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const apiUrl = rawApiUrl.trim().replace(/\/+$/, "");

      // Prepare conversation history for the backend
      const history = messages
        .filter((msg) => !msg.isError && msg.id !== "welcome-msg")
        .map((msg) => ({
          role: msg.role === "model" ? ("model" as const) : ("user" as const),
          text: msg.text,
        }));

      const res = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          history,
          stream: true,
          clientInfo: {
            screen: typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : undefined,
            language: typeof navigator !== "undefined" ? navigator.language : undefined,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        }),
      });

      if (!res.ok) {
        let errMsg = "Failed to generate AI response.";
        try {
          const errData = await res.json();
          errMsg = errData.error || errMsg;
        } catch {
          // Keep default errMsg
        }
        throw new Error(errMsg);
      }

      const contentType = res.headers.get("content-type") || "";

      // Check if response is streaming SSE
      if (contentType.includes("text/event-stream") && res.body) {
        const botMessageId = createMessageId("bot");
        const botMessage: Message = {
          id: botMessageId,
          role: "model",
          text: "",
          timestamp: getFormattedTime(),
        };

        // Add empty bot message and start word-by-word streaming animation
        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
        setStreamingMessageId(botMessageId);

        streamTargetRef.current = "";
        currentDisplayedRef.current = "";
        isStreamingRef.current = true;

        // Smooth word-by-word / line-by-line typewriter animation runner
        const typewriterRunner = (async () => {
          while (isStreamingRef.current || currentDisplayedRef.current.length < streamTargetRef.current.length) {
            if (currentDisplayedRef.current.length < streamTargetRef.current.length) {
              const remaining = streamTargetRef.current.slice(currentDisplayedRef.current.length);
              const wordsToGrab = remaining.length > 200 ? 3 : remaining.length > 80 ? 2 : 1;
              let chunkToAdd = "";
              let tempSlice = remaining;

              for (let i = 0; i < wordsToGrab; i++) {
                const match = tempSlice.match(/^(\s*\S+|\s+)/);
                if (match) {
                  chunkToAdd += match[0];
                  tempSlice = tempSlice.slice(match[0].length);
                } else {
                  break;
                }
              }

              currentDisplayedRef.current += chunkToAdd;
              const textToDisplay = currentDisplayedRef.current;

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMessageId ? { ...msg, text: textToDisplay } : msg
                )
              );

              const delay = wordsToGrab > 1 ? 12 : 25;
              await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
              // Wait for next network chunk
              await new Promise((resolve) => setTimeout(resolve, 30));
            }
          }
        })();

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              const trimmed = line.trim();
              if (trimmed.startsWith("data: ")) {
                try {
                  const parsed = JSON.parse(trimmed.substring(6));
                  if (parsed.text) {
                    streamTargetRef.current += parsed.text;
                  }
                } catch {
                  // Ignore parse error on partial chunks
                }
              }
            }
          }
        } finally {
          isStreamingRef.current = false;
          await typewriterRunner;
          setStreamingMessageId(null);
        }
      } else {
        // Fallback for standard JSON response with smooth typewriter animation
        const data = await res.json();
        const fullReply = data.reply || "I didn't receive a response. Please try again.";
        const botMessageId = createMessageId("bot");

        const botMessage: Message = {
          id: botMessageId,
          role: "model",
          text: "",
          timestamp: getFormattedTime(),
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsLoading(false);
        setStreamingMessageId(botMessageId);

        streamTargetRef.current = fullReply;
        currentDisplayedRef.current = "";
        isStreamingRef.current = false;

        while (currentDisplayedRef.current.length < streamTargetRef.current.length) {
          const remaining = streamTargetRef.current.slice(currentDisplayedRef.current.length);
          const wordsToGrab = remaining.length > 200 ? 3 : remaining.length > 80 ? 2 : 1;
          let chunkToAdd = "";
          let tempSlice = remaining;

          for (let i = 0; i < wordsToGrab; i++) {
            const match = tempSlice.match(/^(\s*\S+|\s+)/);
            if (match) {
              chunkToAdd += match[0];
              tempSlice = tempSlice.slice(match[0].length);
            } else {
              break;
            }
          }

          currentDisplayedRef.current += chunkToAdd;
          const textToDisplay = currentDisplayedRef.current;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === botMessageId ? { ...msg, text: textToDisplay } : msg
            )
          );

          const delay = wordsToGrab > 1 ? 12 : 25;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        setStreamingMessageId(null);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      console.error("Chatbot request failed:", error);
      setIsLoading(false);
      setStreamingMessageId(null);

      const errorMessage: Message = {
        id: createMessageId("err"),
        role: "model",
        text: `⚠️ **Could not connect**: ${
          err?.message || "Make sure the backend server is running and your `GEMINI_API_KEY` is configured."
        }`,
        timestamp: getFormattedTime(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([INITIAL_MESSAGE]);
  };

  // Safe markdown text parser for bold, inline code, and links
  const renderFormattedText = (content: string, isCurrentlyStreaming = false) => {
    const lines = content.split("\n");

    return (
      <>
        {lines.map((line, lineIdx) => {
          // Check for bullet list
          const isBullet = line.trim().startsWith("- ") || line.trim().startsWith("* ");
          const cleanLine = isBullet ? line.trim().substring(2) : line;

          // Parse bold **text**, inline code `code`, and links [text](url)
          const parts: React.ReactNode[] = [];
          let remaining = cleanLine;
          let partIdx = 0;

          while (remaining.length > 0) {
            // Match Markdown Link [text](url)
            const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
            // Match Bold **text**
            const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
            // Match Inline Code `code`
            const codeMatch = remaining.match(/`([^`]+)`/);

            // Find earliest match
            const matches = [
              linkMatch ? { type: "link", match: linkMatch, index: linkMatch.index! } : null,
              boldMatch ? { type: "bold", match: boldMatch, index: boldMatch.index! } : null,
              codeMatch ? { type: "code", match: codeMatch, index: codeMatch.index! } : null,
            ].filter(Boolean) as { type: string; match: RegExpMatchArray; index: number }[];

            if (matches.length === 0) {
              parts.push(<span key={partIdx++}>{remaining}</span>);
              break;
            }

            matches.sort((a, b) => a.index - b.index);
            const earliest = matches[0];

            // Add text before match
            if (earliest.index > 0) {
              parts.push(<span key={partIdx++}>{remaining.substring(0, earliest.index)}</span>);
            }

            if (earliest.type === "bold") {
              parts.push(
                <strong key={partIdx++} className="font-semibold text-zinc-100">
                  {earliest.match[1]}
                </strong>
              );
            } else if (earliest.type === "code") {
              parts.push(
                <code
                  key={partIdx++}
                  className="px-1.5 py-0.5 rounded bg-zinc-800 text-emerald-300 text-xs font-mono border border-zinc-700/50"
                >
                  {earliest.match[1]}
                </code>
              );
            } else if (earliest.type === "link") {
              const href = earliest.match[2];
              const isInternalSection = href.startsWith("#");

              parts.push(
                <a
                  key={partIdx++}
                  href={href}
                  target={isInternalSection ? "_self" : "_blank"}
                  rel={isInternalSection ? undefined : "noopener noreferrer"}
                  onClick={() => {
                    if (isInternalSection) {
                      if (window.innerWidth < 640) setIsOpen(false);
                    }
                  }}
                  className="inline-flex items-center gap-0.5 text-emerald-400 hover:text-emerald-300 underline underline-offset-2 font-medium"
                >
                  {earliest.match[1]}
                  {!isInternalSection && <ArrowUpRight className="w-3 h-3 inline" />}
                </a>
              );
            }

            remaining = remaining.substring(earliest.index + earliest.match[0].length);
          }

          if (isBullet) {
            return (
              <div key={lineIdx} className="flex items-start gap-2 my-1">
                <span className="text-emerald-400 mt-1.5">•</span>
                <div className="flex-1">{parts}</div>
              </div>
            );
          }

          if (line.trim() === "") {
            return <div key={lineIdx} className="h-2" />;
          }

          return (
            <p key={lineIdx} className="my-0.5 leading-relaxed">
              {parts}
            </p>
          );
        })}

        {/* Blinking cursor while AI is streaming words */}
        {isCurrentlyStreaming && (
          <span className="inline-block w-1.5 h-3.5 bg-emerald-400 ml-1 rounded-sm animate-pulse align-middle" />
        )}
      </>
    );
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-3">
        {/* Floating Tooltip Pill */}
        {!isOpen && hasUnreadPrompt && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-emerald-500/30 text-xs text-zinc-200 shadow-xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Ask Anil&apos;s Digital Clone</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setHasUnreadPrompt(false);
              }}
              className="ml-1 p-0.5 text-zinc-500 hover:text-zinc-300 rounded cursor-pointer"
              aria-label="Dismiss banner"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <button
          onClick={toggleChat}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          className={`group relative flex items-center justify-center p-3.5 sm:p-4 rounded-full shadow-2xl transition-all duration-300 cursor-pointer ${
            isOpen
              ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              : "bg-emerald-500 text-zinc-950 hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          }`}
        >
          {/* Pulsing glow ring when closed */}
          {!isOpen && (
            <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />
          )}

          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <Bot className="w-6 h-6 transition-transform group-hover:scale-110 duration-200" />
              {showNotificationBadge && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-zinc-950 rounded-full" />
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[80vh] flex flex-col rounded-2xl bg-zinc-950/95 border border-zinc-800/90 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-zinc-900/80 border-b border-zinc-800/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-zinc-100">Anil&apos;s Digital Clone</h3>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={clearChat}
                className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
                title="Clear conversation"
                aria-label="Clear conversation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 rounded-lg transition-colors cursor-pointer"
                title="Minimize chat"
                aria-label="Minimize chat"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth text-sm">
            {messages.map((message) => {
              const isUser = message.role === "user";
              const isThisMessageStreaming = message.id === streamingMessageId;

              return (
                <div
                  key={message.id}
                  className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                      isUser
                        ? "bg-emerald-600/20 text-zinc-100 border border-emerald-500/30 rounded-tr-sm"
                        : message.isError
                        ? "bg-rose-950/40 text-rose-200 border border-rose-800/50 rounded-tl-sm"
                        : "bg-zinc-900/80 text-zinc-200 border border-zinc-800/80 rounded-tl-sm backdrop-blur-sm shadow-sm"
                    }`}
                  >
                    <div>{renderFormattedText(message.text, isThisMessageStreaming)}</div>
                    <span
                      className={`block text-[10px] mt-1 text-right font-mono ${
                        isUser ? "text-emerald-400/60" : "text-zinc-500"
                      }`}
                    >
                      {message.timestamp}
                    </span>
                  </div>

                  {isUser && (
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Initial Typing Indicator (before first streamed chunk arrives) */}
            {isLoading && (
              <div className="flex items-center gap-2.5 text-zinc-400">
                <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Bot className="w-4 h-4 animate-pulse" />
                </div>
                <div className="px-3.5 py-2.5 rounded-2xl rounded-tl-sm bg-zinc-900/80 border border-zinc-800/80 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestion Pills */}
          {messages.length <= 2 && !isLoading && !streamingMessageId && (
            <div className="px-3 pb-2 pt-1 border-t border-zinc-900/60 bg-zinc-950/60 flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt.replace(/^[^\w\s]+\s*/, ""))}
                  className="text-[11px] px-2.5 py-1 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-emerald-300 border border-zinc-800/80 hover:border-emerald-500/30 transition-all text-left flex items-center gap-1 cursor-pointer"
                >
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 bg-zinc-900/60 border-t border-zinc-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about skills or projects..."
                disabled={isLoading || !!streamingMessageId}
                className="flex-1 bg-zinc-950 text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-zinc-800 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading || !!streamingMessageId}
                aria-label="Send message"
                className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 disabled:opacity-40 disabled:hover:bg-emerald-500 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading || streamingMessageId ? (
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                ) : (
                  <Send className="w-4 h-4 ml-0.5" />
                )}
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 px-1">
              <span>Anil Suva Portfolio</span>
              <a
                href={`mailto:${personalInfo.email}`}
                className="hover:text-emerald-400 transition-colors"
              >
                Direct: {personalInfo.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
