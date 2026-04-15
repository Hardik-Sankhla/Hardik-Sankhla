import type { Metadata } from "next";
import Link from "next/link";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { readContentCollection } from "../../lib/content";

export const metadata: Metadata = {
  title: "Guides",
  description: "Practical engineering guides for building production AI systems, ML workflows, and reliable evaluation loops.",
  keywords: ["AI guides", "MLOps", "system design", "LLM engineering", "production AI"]
};

export default function GuidesIndexPage() {
  const guides = readContentCollection("guides");

  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <div className="section-header">
            <div>
              <p className="label">// 07 — Guides</p>
              <h2>All Guides</h2>
            </div>
            <span className="section-num">{String(guides.length).padStart(2, "0")} total</span>
          </div>

          <div className="projects-grid">
            {guides.map((guide, index) => (
              <div key={guide.slug} className="project-card">
                <div className="project-num">GDE_{String(index + 1).padStart(2, "0")} / {guide.status ?? "active"}</div>
                <div className="project-title">{guide.title}</div>
                <p className="project-desc">{guide.summary}</p>
                <div className="project-links">
                  <Link href={`/guides/${guide.slug}`} className="project-link">
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="divider" />

          <div className="project-links">
            <Link href="/" className="project-link">
              Home →
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
