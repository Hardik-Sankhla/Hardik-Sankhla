import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MarkdownRenderer from "../../../components/MarkdownRenderer";
import { readContentCollection, readContentDocument } from "../../../lib/content";
import { normalizeHeadingKey, splitByH2Sections } from "../../../lib/markdown";
import { relatedItems } from "../../../lib/related";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const projects = readContentCollection("projects");
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const project = readContentDocument("projects", slug);
    return {
      title: project.title,
      description: project.summary
    };
  } catch {
    return {
      title: "Project"
    };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = params;

  let project;
  try {
    project = readContentDocument("projects", slug);
  } catch {
    notFound();
  }

  const { intro, sections } = splitByH2Sections(project.raw);
  const sectionMap = new Map<string, typeof sections[number]>();
  for (const section of sections) {
    sectionMap.set(normalizeHeadingKey(section.heading), section);
  }

  const required = ["problem", "approach", "architecture", "tech stack", "results", "learnings"] as const;

  const guides = readContentCollection("guides");
  const relatedGuides = relatedItems(project, guides, 3);

  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <div className="section-header">
            <div>
              <p className="label">// 06 — Project</p>
              <h2>{project.title}</h2>
            </div>
            <span className="section-num">{project.status ?? "active"}</span>
          </div>

          {intro.length > 0 ? <MarkdownRenderer blocks={intro} /> : <p className="project-desc">{project.summary}</p>}

          <div className="divider" />

          {required.map((key) => {
            if (key === "tech stack") {
              return (
                <div key={key}>
                  <div className="system-title">Tech Stack</div>
                  {project.stack.length > 0 ? (
                    <div className="tag-row">
                      {project.stack.map((item) => (
                        <span key={item} className="tag">
                          {item}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="project-desc">No stack metadata provided.</p>
                  )}
                  <div className="divider" />
                </div>
              );
            }

            const section = sectionMap.get(key);
            if (!section) {
              return null;
            }

            const title = key
              .split(" ")
              .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
              .join(" ");

            return (
              <div key={key}>
                <div className="system-title">{title}</div>
                <MarkdownRenderer blocks={section.blocks} />
                <div className="divider" />
              </div>
            );
          })}

          {relatedGuides.length > 0 ? (
            <>
              <div className="system-title">Related Guides</div>
              <div className="project-links">
                {relatedGuides.map((guide) => (
                  <Link key={guide.slug} href={`/guides/${guide.slug}`} className="project-link">
                    {guide.title} →
                  </Link>
                ))}
              </div>
              <div className="divider" />
            </>
          ) : null}

          <div className="project-links">
            <Link href="/projects" className="project-link">
              All Projects →
            </Link>
            <Link href="/guides" className="project-link">
              Guides →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
