import Link from "next/link";
import { readContentCollection } from "../../lib/content";

export default function ProjectsPage() {
  const projects = readContentCollection("projects");

  return (
    <main className="shell">
      <section className="hero-card">
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

      <section>
        <h2 className="section-title">All Projects</h2>
        <div className="cards-grid">
          {projects.map((project) => (
            <article key={project.slug} className="project-card">
              <h3>{project.title}</h3>
              <p className="text-textsoft">{project.summary}</p>
              <p className="project-meta">
                Status: {project.status ?? "unspecified"}
                {project.stack.length > 0 ? ` | Stack: ${project.stack.join(", ")}` : ""}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
