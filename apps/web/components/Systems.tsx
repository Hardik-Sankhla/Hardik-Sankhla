const systems = [
  {
    id: "SYS_01",
    title: "AI Systems Engineering",
    desc: "End-to-end ML pipelines: data ingestion, feature stores, model serving, monitoring. Built to run in production, not Jupyter.",
    tags: ["RAG", "Embeddings", "Inference", "Eval"]
  },
  {
    id: "SYS_02",
    title: "ML Infrastructure",
    desc: "Training pipelines, distributed compute, experiment tracking. Fine-tuning LLMs with LoRA. Scaling from prototype to cluster.",
    tags: ["Fine-tuning", "Distributed", "MLOps", "CI/CD"]
  },
  {
    id: "SYS_03",
    title: "Autonomous Agents",
    desc: "Multi-agent orchestration, tool use, memory systems, evaluation loops. Agents that actually complete tasks — not hallucinate them.",
    tags: ["Agents", "Memory", "Tool Use", "ReAct"]
  }
];

export default function Systems() {
  return (
    <section id="systems">
      <div className="container">
        <div className="section-header">
          <div>
            <p className="label">// 02 — Domains</p>
            <h2>Systems I Build</h2>
          </div>
          <span className="section-num">03 areas</span>
        </div>
        <div className="systems-grid">
          {systems.map((system) => (
            <div key={system.id} className="system-card">
              <div className="system-icon">{system.id}</div>
              <div className="system-title">{system.title}</div>
              <p className="system-desc">{system.desc}</p>
              <div className="system-tags">
                {system.tags.map((tag) => (
                  <span key={tag} className="system-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
