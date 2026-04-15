import fs from "node:fs";
import path from "node:path";

type ProjectFrontmatter = {
  title: string;
  status?: string;
  stack?: string[];
};

function parseProject(filePath: string): ProjectFrontmatter {
  const raw = fs.readFileSync(filePath, "utf-8");
  const title = /title:\s*(.+)/.exec(raw)?.[1]?.trim() ?? path.basename(filePath, ".md");
  const status = /status:\s*(.+)/.exec(raw)?.[1]?.trim();
  const stackBlock = /stack:\s*([\s\S]*?)\n---/.exec(raw)?.[1] ?? "";
  const stack = stackBlock
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.replace(/^-\s*/, ""));

  return { title, status, stack };
}

export default function HomePage() {
  const projectsDir = path.resolve(process.cwd(), "../../content/projects");
  const projectFiles = fs
    .readdirSync(projectsDir)
    .filter((name) => name.endsWith(".md"))
    .sort();

  const projects = projectFiles.map((name) => parseProject(path.join(projectsDir, name)));

  return (
    <main>
      <section className="hero">
        <h1>Hardik Sankhla — AI Systems Hub</h1>
        <p>
          Production-grade personal ecosystem with a centralized content layer and multi-surface outputs for
          profile, portfolio, and docs.
        </p>
        <div className="links">
          <a href="https://github.com/Hardik-Sankhla" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/hardik-sankhla/" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="mailto:datascientist.hardiksankhla@gmail.com">Contact</a>
        </div>
      </section>

      <section className="section">
        <h2>Projects (from /content)</h2>
        <div className="cards">
          {projects.map((project) => (
            <article key={project.title} className="card">
              <h3>{project.title}</h3>
              <p>Centralized project definition used by portfolio and docs surfaces.</p>
              <div className="meta">
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
