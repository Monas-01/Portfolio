"use client";

import React, { useState, useRef, useEffect } from "react";
import VariableProximity from "@/components/VariableProximity";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Education & Certifications", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionIds = ["about", "education", "skills", "projects", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(`#${id}`);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="nav-floating-header fixed top-5 sm:top-6 inset-x-0 mx-auto z-[9999] w-[90%] max-w-sm pointer-events-none">
      <div className="pointer-events-auto rounded-3xl border border-white/15 bg-[#0e0e0e] text-[#f2f0ec] shadow-2xl overflow-hidden transition-all duration-300">
        {/* Main Floating Pill Header */}
        <div className="flex items-center justify-between px-5 py-3">
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="text-sm font-semibold tracking-tight text-[#f2f0ec] hover:text-white transition-colors flex items-center gap-2"
          >
            <span>Monas Waqar</span>
            {activeSection && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#f2f0ec]/50 hidden sm:inline">
                &middot; {navItems.find((item) => item.href === activeSection)?.label}
              </span>
            )}
          </a>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[#f2f0ec] hover:bg-white/20 transition-colors text-xs font-bold tracking-widest cursor-pointer"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? "✕" : "•••"}
          </button>
        </div>

        {/* Downward Expanded Panel */}
        {isOpen && (
          <div className="border-t border-white/10 px-4 pt-3 pb-4">
            <nav
              ref={navContainerRef}
              className="flex flex-col gap-2 relative"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`w-full rounded-full px-4 py-2.5 text-center text-sm transition-all cursor-pointer select-none flex items-center justify-center ${
                      isActive
                        ? "bg-white text-[#0e0e0e] font-semibold ring-2 ring-white/60 shadow-sm"
                        : "bg-[#f2f0ec] text-[#0e0e0e] hover:bg-white"
                    }`}
                  >
                    <VariableProximity
                      label={item.label}
                      fromFontVariationSettings={isActive ? "'wght' 600, 'opsz' 14" : "'wght' 400, 'opsz' 9"}
                      toFontVariationSettings="'wght' 800, 'opsz' 24"
                      containerRef={navContainerRef}
                      radius={100}
                      falloff="linear"
                    />
                  </a>
                );
              })}
              <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-around px-2 text-xs font-mono text-[#f2f0ec]/70">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/monas-waqar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/Monas-01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
