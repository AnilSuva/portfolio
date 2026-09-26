"use client";

import { useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "01979f2a-d6c7-429a-94d0-c12c37ae4c10", 
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        showToast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    } catch {
        showToast("Error sending message.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 px-6 relative border-t border-zinc-900/50">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-white flex items-center gap-4">
              <span className="text-emerald-500 font-mono text-sm">05.</span>
              Get In Touch
            </h2>
            <div className="w-12 h-[1px] bg-emerald-500/50 mb-8"></div>
            
            <p className="text-zinc-400 font-light text-lg mb-12 leading-relaxed">
              If you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-6 p-6 rounded-xl bg-zinc-900/30 border border-zinc-800/80 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-zinc-500 text-xs font-mono uppercase tracking-wider mb-1">Email</h3>
                  <p className="text-zinc-200 font-medium">{personalInfo.email}</p>
                </div>
              </a>

              <div className="flex gap-4">
                {personalInfo.socials.filter(s => s.name !== 'Email').map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit my ${social.name}`}
                      className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="bg-zinc-900/20 border border-zinc-800/60 p-8 rounded-xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-zinc-500 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-zinc-500 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-zinc-500 ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-zinc-950/50 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 w-full bg-zinc-100 text-zinc-900 py-4 rounded-lg font-medium hover:bg-zinc-300 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="w-4 h-4" />}
              </button>
            </form>
          </div>
          
        </div>
      </div>

      {/* Premium Toast Notification */}
      <div 
        className={cn(
          "fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-lg border shadow-2xl transition-all duration-500",
          toast 
            ? "translate-y-0 opacity-100" 
            : "translate-y-12 opacity-0 pointer-events-none",
          toast?.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
            : "bg-red-500/10 border-red-500/20 text-red-400"
        )}
      >
        {toast?.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
        <p className="font-medium text-sm text-zinc-100">{toast?.message}</p>
      </div>
    </section>
  );
}
