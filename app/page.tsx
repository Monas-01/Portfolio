"use client";

import React from "react";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import TextType from "@/components/TextType";
import ScrollReveal from "@/components/ScrollReveal";
import LogoLoop from "@/components/LogoLoop";
import FadeIn from "@/components/FadeIn";
import BounceCards from "@/components/BounceCards";
import { FaAws, FaLinkedin, FaGithub } from "react-icons/fa6";
import {
  SiGithubactions,
  SiJenkins,
  SiTerraform,
  SiDocker,
  SiKubernetes,
  SiOpenjdk,
  SiPython,
  SiCplusplus,
  SiMysql,
} from "react-icons/si";
import { Mail } from "lucide-react";
import { projects, Project } from "@/data/projects";

interface SkillCategory {
  category: string;
  items: string[];
}

const skillCategories: SkillCategory[] = [
  {
    category: "Cloud",
    items: ["AWS"],
  },
  {
    category: "CI/CD",
    items: ["GitHub Actions", "Jenkins"],
  },
  {
    category: "IaC",
    items: ["Terraform"],
  },
  {
    category: "Containers",
    items: ["Docker", "Kubernetes"],
  },
  {
    category: "Languages",
    items: ["Java", "Python", "C++"],
  },
  {
    category: "Database",
    items: ["MySQL"],
  },
];

const allSkillsList: string[] = [
  "AWS",
  "GitHub Actions",
  "Jenkins",
  "Terraform",
  "Docker",
  "Kubernetes",
  "Java",
  "Python",
  "C++",
  "MySQL",
];

const techLogos = [
  { node: <FaAws title="AWS" />, title: "AWS" },
  { node: <SiGithubactions title="GitHub Actions" />, title: "GitHub Actions" },
  { node: <SiJenkins title="Jenkins" />, title: "Jenkins" },
  { node: <SiTerraform title="Terraform" />, title: "Terraform" },
  { node: <SiDocker title="Docker" />, title: "Docker" },
  { node: <SiKubernetes title="Kubernetes" />, title: "Kubernetes" },
  { node: <SiOpenjdk title="Java" />, title: "Java" },
  { node: <SiPython title="Python" />, title: "Python" },
  { node: <SiCplusplus title="C++" />, title: "C++" },
  { node: <SiMysql title="MySQL" />, title: "MySQL" },
];

interface EducationInfo {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
  gpa: string;
}

const educationData: EducationInfo = {
  degree: "Bachelor of Science in Software Engineering",
  institution: "University of Central Punjab",
  location: "Lahore, Pakistan",
  graduationYear: "Graduating 2028",
  gpa: "3.5+",
};

interface Certification {
  title: string;
  issuer: string;
  issuedDate: string;
}

const certificationsData: Certification[] = [
  {
    title: "Using Python to Access Web Data",
    issuer: "Coursera / University of Michigan",
    issuedDate: "2024",
  },
  {
    title: "Python Data Structures",
    issuer: "Coursera / University of Michigan",
    issuedDate: "2024",
  },
  {
    title: "Programming for Everybody: Getting Started with Python",
    issuer: "Coursera / University of Michigan",
    issuedDate: "2024",
  },
  {
    title: "Start Writing Prompts like a Pro",
    issuer: "Google",
    issuedDate: "2026",
  },
  {
    title: "Work Smarter, Not Harder: Time Management for Personal & Professional Productivity",
    issuer: "UC Irvine / Coursera",
    issuedDate: "2024",
  },
];

interface ContactChannel {
  label: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
}

const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: "monaswaqar01@gmail.com",
    href: "mailto:monaswaqar01@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/monas-waqar",
    href: "https://www.linkedin.com/in/monas-waqar/",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/Monas-01",
    href: "https://github.com/Monas-01",
    icon: FaGithub,
    external: true,
  },
];

function SectionTitle({
  tag,
  title,
}: {
  tag: string;
  title: string;
}) {
  return (
    <div className="mb-10 sm:mb-12">
      <p className="mb-2.5 text-xs font-mono uppercase tracking-widest text-muted">
        {tag}
      </p>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl font-display text-foreground">
        {title}
      </h2>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const hasMedia = Boolean(
    project.images || project.slug === "vaultly" || project.image
  );

  return (
    <article className="rounded-2xl border border-border bg-white p-5 sm:p-7 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-display text-foreground">
          {project.title}
        </h3>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-[#0e0e0e] px-3.5 py-1 text-xs font-medium text-[#f2f0ec] hover:bg-neutral-800 transition-colors"
          >
            Visit Live Demo
          </a>
        ) : project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#0e0e0e] px-3.5 py-1 text-xs font-medium text-[#f2f0ec] hover:bg-neutral-800 transition-colors"
          >
            <FaGithub className="h-3.5 w-3.5" />
            <span>View on GitHub</span>
          </a>
        ) : null}
      </div>

      <p className="mb-2 text-sm sm:text-base font-medium text-foreground leading-snug">
        {project.tagline}
      </p>

      <p className="mb-3.5 text-xs sm:text-sm leading-relaxed text-[#444440]">
        {project.description}
      </p>

      {project.tags && project.tags.length > 0 && (
        <div className={hasMedia ? "mb-4" : ""}>
          <h4 className="mb-1.5 text-xs font-mono uppercase tracking-wider text-muted">
            Tech Stack
          </h4>
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border bg-[#f2f0ec] px-2.5 py-0.5 text-xs text-foreground font-mono"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.images || project.slug === "vaultly" ? (
        <div className="flex items-center justify-center py-1 sm:py-1.5 px-2 overflow-hidden rounded-xl border border-border bg-[#f2f0ec]/40">
          <BounceCards
            images={
              project.images || [
                "/projects/vaultly/dashboard.png",
                "/projects/vaultly/upload.png",
                "/projects/vaultly/products.png",
                "/projects/vaultly/warranties.png",
                "/projects/vaultly/landing.png",
              ]
            }
            containerWidth={280}
            containerHeight={115}
            animationDelay={0.4}
            animationStagger={0.06}
            easeType="elastic.out(1, 0.6)"
            transformStyles={[
              "rotate(3deg) translate(-75px)",
              "rotate(-2deg) translate(-38px)",
              "rotate(0deg)",
              "rotate(2deg) translate(38px)",
              "rotate(-3deg) translate(75px)",
            ]}
            enableHover={true}
          />
        </div>
      ) : project.image ? (
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      ) : null}
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-32 sm:pt-40 lg:pt-44 pb-28 sm:pb-36 space-y-36 sm:space-y-48 lg:space-y-56">
      {/* 1. Hero Section */}
      <section id="hero" className="scroll-mt-32 sm:scroll-mt-36 text-left">
        {/* Role badge with decorative architectural dash */}
        <div className="mb-6 sm:mb-8 flex items-center gap-3 text-sm sm:text-base font-mono uppercase tracking-widest text-muted min-h-[2rem]">
          <span className="inline-block h-[1px] w-6 sm:w-8 bg-neutral-400 shrink-0" aria-hidden="true" />
          <TextType
            text={["DevOps Engineer", "Cloud Engineer", "Full Stack Developer"]}
            typingSpeed={75}
            pauseDuration={1500}
            deletingSpeed={50}
            showCursor
            cursorCharacter="_"
            loop
          />
        </div>

        {/* High-contrast dominant name */}
        <h1 className="mb-10 sm:mb-14 text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold tracking-tight font-display text-foreground leading-[0.95]">
          Monas Waqar
        </h1>

        {/* Secondary tagline */}
        <p className="mb-12 sm:mb-16 text-lg sm:text-xl font-normal leading-relaxed text-[#333330] max-w-xl">
          Building and automating scalable cloud infrastructure with CI/CD,
          containerization, and modern DevOps practices.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-wrap gap-4 items-center">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-7 py-3.5 text-sm sm:text-base font-medium text-[#f2f0ec] hover:bg-[#2a2a2a] active:scale-[0.98] transition-all shadow-sm"
          >
            View Work
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-7 py-3.5 text-sm sm:text-base font-medium text-[#f2f0ec] hover:bg-[#2a2a2a] active:scale-[0.98] transition-all shadow-sm"
          >
            Contact Me
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#1a1a1a] px-7 py-3.5 text-sm sm:text-base font-medium text-[#f2f0ec] hover:bg-[#2a2a2a] active:scale-[0.98] transition-all shadow-sm"
          >
            Resume
          </a>
        </div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="scroll-mt-32 sm:scroll-mt-36">
        <FadeIn>
          <SectionTitle tag="Background" title="About" />
        </FadeIn>
        <div className="max-w-2xl space-y-7 sm:space-y-8 text-lg sm:text-xl lg:text-[1.35rem] leading-relaxed sm:leading-[1.85] text-[#333330]">
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur
            baseRotation={1.2}
            blurStrength={2.5}
            scrub={1}
            textClassName="about-body-text"
          >
            I&apos;m Monas, a Software Engineering student based in Lahore,
            Pakistan, focused on DevOps, cloud infrastructure, and modern
            software development.
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur
            baseRotation={1.2}
            blurStrength={2.5}
            scrub={1}
            textClassName="about-body-text"
          >
            I&apos;m interested in everything that happens between writing code
            and running it reliably in production. I&apos;ve worked with AWS,
            Linux, CI/CD, server deployment, and full stack applications, with a
            growing focus on automation, scalability, and reliable infrastructure.
          </ScrollReveal>
          <ScrollReveal
            baseOpacity={0.15}
            enableBlur
            baseRotation={1.2}
            blurStrength={2.5}
            scrub={1}
            textClassName="about-body-text"
          >
            Currently, I&apos;m continuing to build real world projects while
            expanding my knowledge of cloud engineering, DevOps practices, and
            modern deployment technologies.
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Education & Certifications Section */}
      <section id="education" className="scroll-mt-32 sm:scroll-mt-36">
        <FadeIn>
          <SectionTitle tag="Qualifications" title="Education & Certifications" />

          {/* Education Highlighted Block */}
          <div className="mb-10 rounded-2xl border border-border bg-white p-7 sm:p-9 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
              <h3 className="text-xl sm:text-2xl font-bold font-display text-foreground">
                {educationData.degree}
              </h3>
              <span className="text-xs font-mono uppercase tracking-wider text-muted">
                {educationData.graduationYear} &middot; GPA {educationData.gpa}
              </span>
            </div>
            <p className="text-base text-muted">
              {educationData.institution}, {educationData.location}
            </p>
          </div>

          {/* Certifications List */}
          <div>
            <h3 className="mb-4 text-xs font-mono uppercase tracking-widest text-muted">
              Certifications
            </h3>
            <div className="border-t border-border divide-y divide-border">
              {certificationsData.map((cert) => (
                <div
                  key={cert.title}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-6 group"
                >
                  <h4 className="font-bold font-display text-foreground text-base sm:text-lg leading-snug">
                    {cert.title}
                  </h4>
                  <div className="flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted shrink-0 sm:text-right">
                    <span>{cert.issuer}</span>
                    <span className="text-muted/40 font-mono" aria-hidden="true">&middot;</span>
                    <span className="font-mono text-muted/80">{cert.issuedDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 4. Skills Section */}
      <section id="skills" className="scroll-mt-32 sm:scroll-mt-36">
        <FadeIn>
          <SectionTitle tag="Expertise" title="Skills" />

          {/* Categorized Skills Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {skillCategories.map((group) => (
              <div
                key={group.category}
                className="rounded-2xl border border-border bg-white p-6 shadow-sm"
              >
                <h3 className="mb-4 text-sm font-bold font-display text-foreground">
                  {group.category}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-[#f2f0ec] px-3.5 py-1 text-xs text-foreground font-mono"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Animated Tech LogoLoop */}
          <div className="rounded-2xl border border-border bg-[#F2F0EC] py-5 px-4 shadow-sm overflow-hidden">
            <LogoLoop
              logos={techLogos}
              speed={80}
              fadeOut
              fadeOutColor="#F2F0EC"
              scaleOnHover
              logoHeight={32}
              gap={44}
            />
          </div>
        </FadeIn>
      </section>

      {/* 5. Projects Section */}
      <section id="projects" className="scroll-mt-32 sm:scroll-mt-36">
        <FadeIn>
          <SectionTitle tag="Selected Work" title="Projects" />

          <div className="space-y-10">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 6. Contact Section */}
      <section id="contact" className="scroll-mt-32 sm:scroll-mt-36">
        <FadeIn>
          <SectionTitle tag="Get in Touch" title="Contact" />

          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* Contact Form */}
            <ContactForm />

            {/* Direct Channels */}
            <div className="rounded-2xl border border-border bg-white p-7 sm:p-9 shadow-sm">
              <h3 className="mb-6 text-xs font-mono uppercase tracking-widest text-muted">
                Direct Contact
              </h3>
              <ul className="space-y-6">
                {contactChannels.map(({ label, value, href, icon: Icon, external }) => (
                  <li key={label}>
                    <p className="mb-1.5 flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted">
                      <Icon className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                      <span>{label}</span>
                    </p>
                    <a
                      href={href}
                      {...(external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="text-base font-medium text-foreground hover:opacity-70 transition-opacity break-all sm:break-normal"
                    >
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}

