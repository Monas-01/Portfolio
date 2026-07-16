import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "About — Monas Waqar",
};

const skillCategories = [
  {
    label: "Languages",
    skills: ["Python", "Java", "C++", "JavaScript"],
  },
  {
    label: "Databases",
    skills: ["SQL", "PostgreSQL", "MySQL"],
  },
  {
    label: "DevOps / Cloud",
    skills: ["CI/CD pipelines", "Infrastructure as Code", "Container orchestration"],
  },
  {
    label: "Web",
    skills: ["HTML5", "CSS3"],
  },
];

const certifications = [
  "Using Python to Access Web Data (Coursera)",
  "Python Data Structures (Coursera)",
  "Programming for Everybody: Getting Started with Python (Coursera)",
];

function SectionHeader({ children }) {
  return (
    <h2 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

function SkillBadge({ label }) {
  return (
    <li className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground transition-colors duration-200 hover:border-accent/40">
      {label}
    </li>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-28 sm:pt-32">
      <FadeIn>
        <h1 className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">
          About
        </h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <section className="mb-20 max-w-2xl">
          <SectionHeader>Bio</SectionHeader>
          <p className="text-lg leading-relaxed text-muted">
            Based in Lahore, Pakistan. I&apos;m currently pursuing a Bachelor
            of Science in Software Engineering at the University of Central
            Punjab (graduating 2028, GPA 3.58). My background spans DevOps and
            cloud engineering, Java development, and database systems, with a
            strong foundation in Python, C++, JavaScript, and web fundamentals.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={0.1}>
        <section className="mb-20">
          <SectionHeader>Skills</SectionHeader>
          <div className="grid gap-8 sm:grid-cols-2">
            {skillCategories.map((category) => (
              <div key={category.label}>
                <h3 className="mb-3 text-sm font-medium text-foreground">
                  {category.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill} label={skill} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={0.15}>
        <section className="mb-20 max-w-2xl">
          <SectionHeader>Certifications</SectionHeader>
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-start gap-3 text-muted transition-colors duration-200 hover:text-foreground"
              >
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">{cert}</span>
              </li>
            ))}
          </ul>
        </section>
      </FadeIn>

      <FadeIn delay={0.2}>
        <section className="max-w-2xl">
          <SectionHeader>Education</SectionHeader>
          <div className="rounded-xl border border-border bg-surface p-6 transition-colors duration-200">
            <h3 className="mb-1 font-medium text-foreground">
              Bachelor of Science in Software Engineering
            </h3>
            <p className="mb-2 text-muted">
              University of Central Punjab, Lahore
            </p>
            <p className="text-sm text-muted">Graduating 2028 · GPA 3.58</p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
