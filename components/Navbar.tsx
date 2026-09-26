"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { personalInfo } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= (element.offsetTop - 150)) {
          current = section;
        }
      }
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
        <Link 
          href="#home" 
          className="text-xl font-bold tracking-tighter text-zinc-100 hover:text-emerald-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {personalInfo.name.split(" ").map((n) => n[0]).join("")}
          <span className="text-emerald-500">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-zinc-900/50 px-6 py-2.5 rounded-full border border-zinc-800/80 backdrop-blur-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-emerald-400",
                activeSection === link.href.substring(1) 
                  ? "text-emerald-400" 
                  : "text-zinc-400"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden p-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-900 shadow-xl overflow-hidden">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "px-6 py-3 text-base font-medium transition-colors hover:bg-zinc-900",
                  activeSection === link.href.substring(1)
                    ? "text-emerald-400 bg-zinc-900/50"
                    : "text-zinc-400"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
