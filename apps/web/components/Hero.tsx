export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-image-layer" aria-hidden="true">
        <img
          src="/assets/images/HardikSankhlaLinkedinProfileBackground.png"
          alt=""
          width={900}
          height={879}
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="container">
        <div className="hero-content">
          <p className="hero-meta">// v1.0.0 · AI Systems Engineer · India</p>
          <h1 className="hero-name">
            Hardik
            <br />
            <span>Sankhla</span>
          </h1>
          <p className="hero-role">— Building Systems That Think</p>
          <p className="hero-desc">
            I design and build autonomous ML infrastructure — from LLM pipelines to agent architectures. Not wrappers.
            Not demos. Production systems that scale.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn">
              View Work
            </a>
            <a href="#contact" className="btn btn-ghost">
              Get In Touch
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-n">3+</span>
              <span className="stat-l">Years</span>
            </div>
            <div className="stat">
              <span className="stat-n">12+</span>
              <span className="stat-l">Systems</span>
            </div>
            <div className="stat">
              <span className="stat-n">∞</span>
              <span className="stat-l">Iterations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
