"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface OpenChatButtonProps {
  className?: string;
  label?: string;
}

export default function OpenChatButton({
  className = "",
  label = "Ask AI Assistant",
}: OpenChatButtonProps) {
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-portfolio-chat"));
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-6 py-4 rounded-lg font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-300 transition-all duration-300 cursor-pointer backdrop-blur-sm ${className}`}
      aria-label="Open AI chat assistant"
    >
      <Sparkles className="w-4 h-4 animate-pulse text-emerald-400" />
      <span>{label}</span>
    </button>
  );
}
