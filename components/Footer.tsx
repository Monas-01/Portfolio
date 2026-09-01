import React from "react";
import ScrollVelocity from "@/components/ScrollVelocity";
import { Mail, FileText } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

interface FooterLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

const footerLinks: FooterLink[] = [
  {
    label: "Email",
    href: "mailto:monaswaqar01@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/monas-waqar/",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/Monas-01",
    icon: FaGithub,
    external: true,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    icon: FileText,
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      {/* ScrollVelocity skills marquee */}
      <div className="py-6 sm:py-8 border-b border-border overflow-hidden bg-white/30 backdrop-blur-[2px]">
        <ScrollVelocity
          texts={[
            "AWS · DOCKER · KUBERNETES · TERRAFORM · CI/CD · JENKINS · GITHUB ACTIONS · JAVA · PYTHON · MYSQL ·",
          ]}
          velocity={60}
          numCopies={6}
          damping={50}
          stiffness={400}
        />
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 py-12 sm:flex-row">
        <p className="text-xs font-mono text-muted">
          &copy; 2026 Monas Waqar. All Rights Reserved.
        </p>

        <ul className="flex items-center gap-3">
          {footerLinks.map(({ label, href, icon: Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                title={label}
                {...(external && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-[#e8e5de] text-foreground transition-all duration-200 hover:bg-[#dad5cc] hover:scale-105 active:scale-95 shadow-sm"
              >
                <Icon className="h-4.5 w-4.5 text-foreground" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
