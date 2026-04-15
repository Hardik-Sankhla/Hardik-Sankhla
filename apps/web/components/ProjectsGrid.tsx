type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  status?: string;
};

type ProjectsGridProps = {
  projects: Project[];
};

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const year = new Date().getFullYear();

  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="label">// 03 — Work</p>
            <h2>Selected Projects</h2>
          </div>
          <span className="section-num">{String(projects.length).padStart(2, "0")} projects</span>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project.slug} className="project-card">
              <div className="project-num">
                PRJ_{String(index + 1).padStart(2, "0")} / {year}
              </div>
              <div className="project-title">{project.title}</div>
              <p className="project-desc">{project.summary}</p>
              <div className="project-links">
                <a
                  href={`https://github.com/Hardik-Sankhla/Hardik-Sankhla/blob/main/content/projects/${project.slug}.md`}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub →
                </a>
                <a href={`/projects/${project.slug}`} className="project-link">
                  Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
