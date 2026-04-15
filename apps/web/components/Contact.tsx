export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-left">
            <p className="label">// 05 — Contact</p>
            <h2>
              Let&apos;s build
              <br />
              <span>something real.</span>
            </h2>
            <p>
              Open to research collaborations, full-time roles, and consulting on ML infrastructure problems. If
              you&apos;re building something ambitious, reach out.
            </p>
          </div>
          <div className="contact-links">
            <a href="mailto:datascientist.hardiksankhla@gmail.com" className="contact-link">
              <span className="cl-icon">EMAIL</span>
              <span className="cl-text">datascientist.hardiksankhla@gmail.com</span>
              <span className="cl-arrow">→</span>
            </a>
            <a href="https://github.com/Hardik-Sankhla" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="cl-icon">GITHUB</span>
              <span className="cl-text">github.com/Hardik-Sankhla</span>
              <span className="cl-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/hardik-sankhla/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="cl-icon">LINKEDIN</span>
              <span className="cl-text">linkedin.com/in/hardik-sankhla</span>
              <span className="cl-arrow">→</span>
            </a>
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <span className="cl-icon">X / TW</span>
              <span className="cl-text">@hardik_ai</span>
              <span className="cl-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
