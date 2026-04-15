import type { Metadata } from "next";
import { readContentCollection } from "../../lib/content";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Engineering case studies covering AI systems, ML platforms, observability pipelines, and production deployment patterns.",
  keywords: ["AI projects", "ML case studies", "system architecture", "MLOps", "engineering portfolio"]
};

export default function ProjectsPage() {
  const projects = readContentCollection("projects");

  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <div className="section-header">
            <div>
              <p className="label">// 06 — Projects</p>
              <h2>All Projects</h2>
            </div>
            <span className="section-num">{String(projects.length).padStart(2, "0")} total</span>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.slug} className="project-card">
                <div className="project-num">PRJ_{String(index + 1).padStart(2, "0")} / {project.status ?? "active"}</div>
                <div className="project-title">{project.title}</div>
                <p className="project-desc">{project.summary}</p>
                <div className="project-links">
                  <Link href={`/projects/${project.slug}`} className="project-link">
                    Case Study →
                  </Link>
                  <a
                    href={`https://github.com/Hardik-Sankhla/Hardik-Sankhla/blob/main/content/projects/${project.slug}.md`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    Source →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="project-links">
            <Link href="/" className="project-link">
              Home →
            </Link>
            <a
              href="https://github.com/Hardik-Sankhla?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              GitHub Repositories →
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
