import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Systems from "../components/Systems";
import ProjectsGrid from "../components/ProjectsGrid";
import Terminal from "../components/Terminal";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import projectsData from "../generated/projects.json";

export const metadata: Metadata = {
  title: "Home",
  description:
    "AI systems engineering portfolio homepage featuring production case studies, architecture thinking, and ML product delivery experience.",
  keywords: ["AI systems", "machine learning engineer", "portfolio", "case studies", "data science"]
};

type Project = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  status?: string;
};

export default function HomePage() {
  const projects = (projectsData.projects as Project[]).slice(0, 4);

  return (
    <>
      <Navbar />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Systems />
      <div className="divider" />
      <ProjectsGrid projects={projects} />
      <div className="divider" />
      <Terminal />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  );
}
