import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MarkdownRenderer from "../../../components/MarkdownRenderer";
import { readContentCollection, readContentDocument } from "../../../lib/content";
import { parseMarkdownBlocks } from "../../../lib/markdown";
import { relatedItems } from "../../../lib/related";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const guides = readContentCollection("guides");
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const guide = readContentDocument("guides", slug);
    return {
      title: guide.title,
      description: guide.summary
    };
  } catch {
    return { title: "Guide" };
  }
}

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = params;

  let guide;
  try {
    guide = readContentDocument("guides", slug);
  } catch {
    notFound();
  }

  const blocks = parseMarkdownBlocks(guide.raw);

  const projects = readContentCollection("projects");
  const relatedProjects = relatedItems(guide, projects, 3);

  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <div className="section-header">
            <div>
              <p className="label">// 07 — Guide</p>
              <h2>{guide.title}</h2>
            </div>
            <span className="section-num">{guide.status ?? "active"}</span>
          </div>

          <MarkdownRenderer blocks={blocks} />

          {guide.stack.length > 0 ? (
            <>
              <div className="divider" />
              <div className="system-title">Topics</div>
              <div className="tag-row">
                {guide.stack.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
            </>
          ) : null}

          {relatedProjects.length > 0 ? (
            <>
              <div className="divider" />
              <div className="system-title">Related Projects</div>
              <div className="project-links">
                {relatedProjects.map((project) => (
                  <Link key={project.slug} href={`/projects/${project.slug}`} className="project-link">
                    {project.title} →
                  </Link>
                ))}
              </div>
            </>
          ) : null}

          <div className="divider" />

          <div className="project-links">
            <Link href="/guides" className="project-link">
              All Guides →
            </Link>
            <Link href="/projects" className="project-link">
              Projects →
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
