import Link from "next/link";
import type { Metadata } from "next";
import { readContentCollection } from "../../lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering case studies covering AI systems, ML platforms, observability pipelines, and production deployment patterns.",
  keywords: ["AI projects", "ML case studies", "system architecture", "MLOps", "engineering portfolio"]
};

export default function ProjectsPage() {
  const projects = readContentCollection("projects");

  return (
    <main className="shell space-y-10 pb-14">
      <section className="hero-card reveal-section">
        <h1>Project Index</h1>
        <p className="text-textsoft">
          This page is rendered dynamically from canonical files under <strong>/content/projects</strong>.
        </p>
        <div className="pill-links">
          <Link href="/">Back to Home</Link>
          <a href="https://github.com/Hardik-Sankhla?tab=repositories" target="_blank" rel="noreferrer">
            GitHub Repositories
          </a>
        </div>
      </section>

      <section className="reveal-section">
        <h2 className="section-title">All Projects</h2>
        <div className="cards-grid">
          {projects.map((project) => (
            <article key={project.slug} className="project-card project-card-raise flex flex-col gap-2">
              <h3>{project.title}</h3>
              <p className="text-textsoft">{project.summary}</p>
              <p className="project-meta">
                Status: {project.status ?? "unspecified"}
                {project.stack.length > 0 ? ` | Stack: ${project.stack.join(", ")}` : ""}
              </p>
              <a
                href={`https://github.com/Hardik-Sankhla/Hardik-Sankhla/blob/main/content/projects/${project.slug}.md`}
                target="_blank"
                rel="noreferrer"
                className="mt-auto text-sm text-cyan-200 transition hover:text-cyan-100"
              >
                View case study source
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
