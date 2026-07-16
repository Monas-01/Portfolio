import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/data/projects";

function ProjectCard({ project, featured = false }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 ${
        featured ? "md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-border/30 ${
          featured ? "aspect-[16/10] md:aspect-auto md:w-1/2 md:min-h-64" : "aspect-[16/10]"
        }`}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes={
              featured
                ? "(max-width: 768px) 100vw, 50vw"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            }
          />
        ) : (
          <div className="flex h-full min-h-48 items-center justify-center text-muted/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-12 w-12"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col justify-center p-6 ${featured ? "md:p-8" : ""}`}>
        <h3 className="mb-2 text-xl font-medium transition-colors duration-200 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted">{project.tagline}</p>
        {project.tags?.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Link>
  );
}

function ProjectsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-20 text-center">
      <div className="mb-4 text-muted/50">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mx-auto h-10 w-10"
          aria-hidden="true"
        >
          <path d="M12 10v6" />
          <path d="M9 13h6" />
          <rect width="18" height="18" x="3" y="3" rx="2" />
        </svg>
      </div>
      <p className="max-w-sm text-muted">
        New projects coming soon — check back shortly.
      </p>
    </div>
  );
}

export default function Home() {
  const isSingleProject = projects.length === 1;

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-28 sm:pt-32">
        <FadeIn>
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
            DevOps / Cloud Engineer
          </p>
          <h1 className="mb-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Monas Waqar
          </h1>
          <p className="mb-6 max-w-2xl text-lg leading-relaxed text-foreground sm:text-xl">
            Automating and scaling resilient cloud infrastructure with CI/CD
            pipelines, Infrastructure as Code, and container orchestration.
          </p>
          <p className="mb-10 max-w-xl text-base leading-relaxed text-muted">
            Based in Lahore, Pakistan. Software Engineering student with a
            background in DevOps, cloud, Java, and databases.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
            >
              View Work
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Contact Me
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              Resume
            </a>
          </div>
        </FadeIn>
      </section>

      <section id="projects" className="mx-auto max-w-5xl scroll-mt-24 px-6 pb-32">
        <FadeIn delay={0.1}>
          <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-muted">
            Selected Work
          </h2>
        </FadeIn>

        {projects.length === 0 ? (
          <FadeIn delay={0.15}>
            <ProjectsEmptyState />
          </FadeIn>
        ) : (
          <ul
            className={
              isSingleProject
                ? "mx-auto max-w-3xl"
                : "grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            {projects.map((project, index) => (
              <li key={project.slug} className={isSingleProject ? "" : "flex"}>
                <FadeIn delay={0.1 + index * 0.08} className="w-full">
                  <ProjectCard project={project} featured={isSingleProject} />
                </FadeIn>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
