import Link from "next/link";
import type { Metadata } from "next";
import { readContentCollection } from "../lib/content";

export const metadata: Metadata = {
  title: "Home",
  description:
    "AI systems engineering portfolio homepage featuring production case studies, architecture thinking, and ML product delivery experience.",
  keywords: ["AI systems", "machine learning engineer", "portfolio", "case studies", "data science"]
};

export default function HomePage() {
  const projects = readContentCollection("projects").slice(0, 5);
  const expertise = [
    {
      title: "AI Systems",
      description: "Designing practical AI architectures that are reliable, testable, and production-ready."
    },
    {
      title: "Machine Learning",
      description: "Building and deploying ML workflows with clear performance goals and measurable outcomes."
    },
    {
      title: "Data Science",
      description: "Turning noisy, real-world data into useful insight and decision-grade intelligence."
    },
    {
      title: "Product Thinking",
      description: "Aligning technical decisions with user value, delivery speed, and long-term maintainability."
    }
  ];

  return (
    <main className="shell space-y-12 pb-16">
      <section className="hero-card reveal-section gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/80">Hardik Sankhla</p>
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Building production-grade AI systems and ML platforms
          </h1>
          <p className="max-w-2xl text-textsoft">
            From models to real-world systems, I combine AI engineering, ML delivery, and product thinking to ship
            reliable software that creates measurable impact.
          </p>
          <div className="pill-links">
            <Link href="/projects">View Projects</Link>
            <a href="https://hardik-sankhla.github.io" target="_blank" rel="noreferrer">
              View Docs
            </a>
            <a href="https://github.com/Hardik-Sankhla" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-200/20 bg-slate-950/30 p-5">
          <p className="text-sm text-textsoft">Focus</p>
          <ul className="mt-3 space-y-2 text-sm text-cyan-100">
            <li>AI platform architecture</li>
            <li>Model integration and deployment</li>
            <li>Evaluation-driven iteration</li>
          </ul>
        </div>
      </section>

      <section className="reveal-section">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold tracking-tight">Featured Projects</h2>
          <Link href="/projects" className="text-sm text-cyan-200 transition hover:text-cyan-100">
            View all projects
          </Link>
        </div>

        <div className="cards-grid">
          {projects.map((project) => (
            <article key={project.slug} className="project-card project-card-raise flex flex-col gap-3">
              <h3 className="text-lg font-medium text-white">{project.title}</h3>
              <p className="text-sm text-textsoft">{project.summary}</p>
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
                View project source
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal-section">
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">What I Do</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {expertise.map((item) => (
            <article key={item.title} className="project-card project-card-raise">
              <h3 className="text-lg font-medium text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-textsoft">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="project-card reveal-section">
        <h2 className="text-2xl font-semibold tracking-tight">Knowledge System</h2>
        <p className="mt-2 max-w-3xl text-sm text-textsoft">
          My docs platform shares the same centralized content pipeline and documents architecture, systems thinking,
          and implementation playbooks.
        </p>
        <a href="https://hardik-sankhla.github.io" target="_blank" rel="noreferrer" className="mt-4 inline-block text-cyan-200 transition hover:text-cyan-100">
          Explore documentation
        </a>
      </section>

      <section className="project-card reveal-section">
        <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
        <div className="pill-links mt-4">
          <a href="https://github.com/Hardik-Sankhla" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/hardik-sankhla/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:datascientist.hardiksankhla@gmail.com">Email</a>
        </div>
      </section>
    </main>
  );
}
