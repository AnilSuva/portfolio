"use client";

import { useState } from "react";
import { personalInfo } from "@/data/portfolio";
import { Mail, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          access_key: "01979f2a-d6c7-429a-94d0-c12c37ae4c10", // Or use process.env.NEXT_PUBLIC_WEB3FORMS_KEY
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message.");
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
    <section id="contact" className="py-24 px-6 relative bg-(--surface)/30 border-t border-(--border-color)">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-(--foreground)">
              /Contact
            </h2>
            <div className="w-20 h-1 bg-(--accent) rounded-full mb-8"></div>
            
            <p className="text-(--text-secondary) font-light text-lg mb-10 leading-relaxed">
              you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="group flex items-center gap-6 p-6 rounded-2xl bg-(--surface) border border-(--border-color) hover:border-(--accent)/50 hover:bg-(--surface-hover) transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-(--surface-hover) border border-(--border-color) flex items-center justify-center text-(--accent) group-hover:scale-110 group-hover:bg-(--accent) group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-(--text-secondary) text-sm font-medium mb-1 uppercase tracking-wider">Email Me At</h3>
                  <p className="text-(--foreground) font-semibold text-lg">{personalInfo.email}</p>
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
                      className="w-14 h-14 rounded-2xl bg-(--surface) border border-(--border-color) flex items-center justify-center text-(--text-secondary) hover:text-(--accent) hover:border-(--accent)/50 hover:bg-(--surface-hover) transition-all duration-300 hover:-translate-y-1"
                    >
                      <Icon className="w-6 h-6" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="glass-panel p-8 md:p-10 rounded-3xl flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-(--text-secondary) ml-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-(--background) border border-(--border-color) rounded-xl px-5 py-4 text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--accent)/50 focus:border-(--accent) transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-(--text-secondary) ml-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-(--background) border border-(--border-color) rounded-xl px-5 py-4 text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--accent)/50 focus:border-(--accent) transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium text-(--text-secondary) ml-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-(--background) border border-(--border-color) rounded-xl px-5 py-4 text-(--foreground) focus:outline-none focus:ring-2 focus:ring-(--accent)/50 focus:border-(--accent) transition-all resize-none"
                  placeholder="Hello, I'd like to talk about..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex items-center justify-center gap-2 w-full bg-(--foreground) text-(--background) py-4 rounded-xl font-bold hover:bg-(--accent) hover:text-white transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </section>
  );
}
