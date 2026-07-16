import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return { title: "Project Not Found — Monas Waqar" };
  }

  return {
    title: `${project.title} — Monas Waqar`,
    description: project.tagline,
  };
}

function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-32 pt-28 text-center sm:pt-32">
      <FadeIn>
        <div className="mx-auto max-w-md">
          <div className="mb-6 text-muted/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto h-12 w-12"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <h1 className="mb-3 text-2xl font-semibold tracking-tight sm:text-3xl">
            Project not found
          </h1>
          <p className="mb-8 text-muted">
            This project doesn&apos;t exist or may have been removed.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
          >
            Back to Home
          </Link>
        </div>
      </FadeIn>
    </div>
  );
}

function GalleryImage({ src, alt }) {
  const isLocal = src.startsWith("/");

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-border/30">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        unoptimized={!isLocal}
      />
    </div>
  );
}

function SkillBadge({ label }) {
  return (
    <li className="rounded-full border border-border bg-surface px-3 py-1 text-sm text-foreground transition-colors duration-200 hover:border-accent/40">
      {label}
    </li>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <ProjectNotFound />;
  }

  const galleryImages = project.images ?? [];

  return (
    <article className="mx-auto max-w-5xl px-6 pb-32 pt-28 sm:pt-32">
      <FadeIn>
        <Link
          href="/#projects"
          className="mb-12 inline-block text-sm text-muted transition-colors duration-200 hover:text-accent"
        >
          &larr; Back to projects
        </Link>
      </FadeIn>

      <FadeIn delay={0.05}>
        <header className="mb-12 max-w-3xl">
          <p className="mb-2 text-sm text-muted">
            {project.role} &middot; {project.year}
          </p>
          <h1 className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {project.title}
          </h1>
          <p className="text-lg leading-relaxed text-muted">{project.tagline}</p>
        </header>
      </FadeIn>

      {galleryImages.length > 0 && (
        <FadeIn delay={0.1}>
          <div
            className={`mb-12 grid gap-4 ${
              galleryImages.length === 1
                ? "max-w-3xl"
                : "sm:grid-cols-2"
            }`}
          >
            {galleryImages.map((src, index) => (
              <GalleryImage
                key={`${src}-${index}`}
                src={src}
                alt={`${project.title} screenshot ${index + 1}`}
              />
            ))}
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.15}>
        <div className="mb-10 max-w-2xl">
          <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
            Overview
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
      </FadeIn>

      {project.tags?.length > 0 && (
        <FadeIn delay={0.2}>
          <div className="mb-10">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-widest text-muted">
              Tech stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <SkillBadge key={tag} label={tag} />
              ))}
            </ul>
          </div>
        </FadeIn>
      )}

      {(project.liveUrl || project.repoUrl) && (
        <FadeIn delay={0.25}>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white transition-colors duration-200 hover:bg-accent-hover"
              >
                View live
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
              >
                View source
              </a>
            )}
          </div>
        </FadeIn>
      )}
    </article>
  );
}
