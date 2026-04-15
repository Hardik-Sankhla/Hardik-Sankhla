import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MarkdownRenderer from "../../components/MarkdownRenderer";
import { parseMarkdownBlocks } from "../../lib/markdown";

export const metadata: Metadata = {
  title: "About",
  description: "Deeper profile, working style, and current focus.",
  keywords: ["about", "AI systems engineer", "Hardik Sankhla"]
};

function readAboutMarkdown(): string {
  const filePath = path.resolve(process.cwd(), "../../content/about.md");
  return fs.readFileSync(filePath, "utf-8");
}

export default function AboutPage() {
  const raw = readAboutMarkdown();
  const blocks = parseMarkdownBlocks(raw);

  return (
    <>
      <Navbar />
      <section>
        <div className="container">
          <div className="section-header">
            <div>
              <p className="label">// 08 — About</p>
              <h2>Deeper Profile</h2>
            </div>
            <span className="section-num">HS_</span>
          </div>

          <MarkdownRenderer blocks={blocks} />

          <div className="divider" />

          <div className="project-links">
            <a href="/#contact" className="project-link">
              Contact →
            </a>
            <a href="/#projects" className="project-link">
              Work →
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
