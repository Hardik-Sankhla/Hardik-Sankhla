"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const hrefs = {
    about: pathname === "/" ? "#about" : "/about",
    systems: pathname === "/" ? "#systems" : "/#systems",
    projects: pathname === "/" ? "#projects" : "/projects",
    terminal: pathname === "/" ? "#terminal-section" : "/#terminal-section",
    contact: pathname === "/" ? "#contact" : "/#contact"
  };

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) {
        setOpen(false);
      }
    };

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const drawer = document.getElementById("navDrawer");
      const button = document.querySelector(".nav-menu-btn");

      if (!drawer || !button) {
        return;
      }

      if (open && !drawer.contains(target) && !button.contains(target)) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("click", onDocumentClick);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onDocumentClick);
    };
  }, [open]);

  const closeNav = () => setOpen(false);

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="Go to homepage" onClick={closeNav}>
            HS_
          </Link>
          <ul className="nav-links">
            <li>
              <a href={hrefs.about}>About</a>
            </li>
            <li>
              <a href={hrefs.systems}>Systems</a>
            </li>
            <li>
              <a href={hrefs.projects}>Projects</a>
            </li>
            <li>
              <a href={hrefs.terminal}>Terminal</a>
            </li>
            <li>
              <a href={hrefs.contact}>Contact</a>
            </li>
          </ul>
          <div className="nav-status">
            <div className="status-dot" />
            <span>Available for work</span>
          </div>
          <button
            type="button"
            className="nav-menu-btn"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${open ? " open" : ""}`} id="navDrawer">
        <a href={hrefs.about} onClick={closeNav}>
          About
        </a>
        <a href={hrefs.systems} onClick={closeNav}>
          Systems
        </a>
        <a href={hrefs.projects} onClick={closeNav}>
          Projects
        </a>
        <a href={hrefs.terminal} onClick={closeNav}>
          Terminal
        </a>
        <a href={hrefs.contact} onClick={closeNav}>
          Contact
        </a>
      </div>
    </>
  );
}
