import Link from "next/link";
import { readContentCollection } from "../lib/content";

export default function HomePage() {
  const projects = readContentCollection("projects");

  return (
    <main className="shell">
      <section className="hero-card">
        <h1>Hardik Sankhla — AI Systems Hub</h1>
        <p className="text-textsoft">
          Production-grade personal ecosystem with a centralized content layer and multi-surface outputs for
          profile, portfolio, and docs.
        </p>
        <div className="pill-links">
          <a href="https://github.com/Hardik-Sankhla" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/hardik-sankhla/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:datascientist.hardiksankhla@gmail.com">Contact</a>
          <Link href="/projects">Projects</Link>
        </div>
      </section>

      <section>
        <h2 className="section-title">Projects (from /content/projects)</h2>
        <div className="cards-grid">
          {projects.slice(0, 6).map((project) => (
            <article key={project.slug} className="project-card">
              <h3>{project.title}</h3>
              <p className="text-textsoft">{project.summary}</p>
              <div className="project-meta">
                Status: {project.status ?? "unspecified"}
                {project.stack && project.stack.length > 0 ? ` | Stack: ${project.stack.join(", ")}` : ""}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
