"use client";

import { useEffect, useRef, useState } from "react";

type TerminalLine =
  | { type: "cmd"; text: string }
  | { type: "out"; text: string; cls?: string }
  | { type: "blank" }
  | { type: "cursor" };

const lines: TerminalLine[] = [
  { type: "cmd", text: "whoami" },
  { type: "out", text: "hardik-sankhla", cls: "accent" },
  { type: "blank" },
  { type: "cmd", text: "cat current_focus.txt" },
  { type: "out", text: "Building autonomous ML systems that operate at scale." },
  { type: "out", text: "Current obsession: reliable agent memory + long-horizon planning." },
  { type: "blank" },
  { type: "cmd", text: "echo $STACK" },
  { type: "out", text: "Python  PyTorch  FastAPI  LangChain  Qdrant  vLLM  Docker" },
  { type: "blank" },
  { type: "cmd", text: "cat principles.md" },
  { type: "out", text: "> Systems over scripts.", cls: "dim" },
  { type: "out", text: "> Observability is not optional.", cls: "dim" },
  { type: "out", text: "> Ship. Measure. Iterate.", cls: "dim" },
  { type: "blank" },
  { type: "cmd", text: "git log --oneline -3" },
  { type: "out", text: "a3f2d1b  feat: add re-ranker to RAG pipeline" },
  { type: "out", text: "9e8c402  fix: reduce hallucination in long-context eval" },
  { type: "out", text: "7b1d99f  refactor: agent memory to episodic + semantic split" },
  { type: "blank" },
  { type: "cursor" }
];

export default function Terminal() {
  const [rendered, setRendered] = useState<TerminalLine[]>([]);
  const startedRef = useRef(false);

  useEffect(() => {
    const section = document.getElementById("terminal-section");
    if (!section) {
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;

    const renderStep = (index: number) => {
      if (index >= lines.length) {
        return;
      }

      const line = lines[index];
      setRendered((prev) => [...prev, line]);

      const delay = line.type === "cmd" ? 280 : line.type === "blank" ? 80 : 55;
      timer = setTimeout(() => renderStep(index + 1), delay);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          observer.disconnect();
          timer = setTimeout(() => renderStep(0), 400);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <section id="terminal-section">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="label">// 04 — Identity</p>
            <h2>System Readout</h2>
          </div>
          <span className="section-num">bash</span>
        </div>
        <div className="terminal">
          <div className="terminal-bar">
            <div className="t-dot t-red" />
            <div className="t-dot t-yellow" />
            <div className="t-dot t-green" />
            <span className="terminal-title">hardik@localhost — zsh</span>
          </div>
          <div className="terminal-body" id="term-output">
            {rendered.map((line, idx) => {
              if (line.type === "blank") {
                return <div key={idx} className="t-blank" />;
              }

              if (line.type === "cursor") {
                return (
                  <div key={idx} className="t-line">
                    <span className="t-prompt">❯</span>
                    <span className="t-cursor" />
                  </div>
                );
              }

              if (line.type === "cmd") {
                return (
                  <div key={idx} className="t-line">
                    <span className="t-prompt">❯</span>
                    <span className="t-cmd">{line.text}</span>
                  </div>
                );
              }

              return (
                <div key={idx} className={`t-out${line.cls ? ` ${line.cls}` : ""}`}>
                  {line.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
