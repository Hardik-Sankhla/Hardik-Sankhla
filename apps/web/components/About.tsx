const coreStack = ["Python", "PyTorch", "FastAPI", "LangChain", "LlamaIndex"];
const infrastructure = ["Docker", "Kubernetes", "Qdrant", "Pinecone", "Redis", "Postgres"];
const llmOps = ["Ollama", "vLLM", "LoRA / QLoRA", "Weights & Biases", "MLflow"];
const cloud = ["AWS", "GCP", "Vercel", "Cloudflare"];

function TagRow({ items }: { items: string[] }) {
  return (
    <div className="tag-row">
      {items.map((item) => (
        <span key={item} className="tag">
          {item}
        </span>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <p className="label">// 01 — About</p>
            <h2>
              Not a developer.
              <br />
              <em>An architect</em>
              <br />
              of intelligence.
            </h2>
            <p>
              I specialize in the unglamorous, high-leverage work: designing ML systems that run reliably at scale.
              Vector databases, retrieval pipelines, agent loops, evaluation frameworks.
            </p>
            <p>
              My mental model is engineering-first. I build for correctness, observability, and longevity — not for
              demos.
            </p>
          </div>
          <div className="about-right">
            <div className="about-right-label">Core Stack</div>
            <TagRow items={coreStack} />

            <div className="about-right-label">Infrastructure</div>
            <TagRow items={infrastructure} />

            <div className="about-right-label">LLM Ops</div>
            <TagRow items={llmOps} />

            <div className="about-right-label">Cloud</div>
            <TagRow items={cloud} />
          </div>
        </div>
      </div>
    </section>
  );
}
