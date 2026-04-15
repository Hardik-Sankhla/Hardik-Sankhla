import type { ReactNode } from "react";
import type { MarkdownBlock } from "../lib/markdown";

function renderListItems(items: string[], ordered: boolean): ReactNode {
  return (
    <div>
      {items.map((item, index) => (
        <p key={index} className="project-desc">
          {ordered ? `${index + 1}. ` : "- "}
          {item}
        </p>
      ))}
    </div>
  );
}

export default function MarkdownRenderer({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div>
      {blocks.map((block, idx) => {
        if (block.type === "paragraph") {
          return (
            <p key={idx} className="project-desc">
              {block.text}
            </p>
          );
        }

        if (block.type === "heading") {
          if (block.level === 1) {
            return (
              <div key={idx} className="system-title">
                {block.text}
              </div>
            );
          }

          if (block.level === 2) {
            return (
              <div key={idx} className="system-title">
                {block.text}
              </div>
            );
          }

          return (
            <div key={idx} className="system-icon">
              {block.text}
            </div>
          );
        }

        if (block.type === "list") {
          return <div key={idx}>{renderListItems(block.items, block.ordered)}</div>;
        }

        if (block.type === "code") {
          return (
            <div key={idx} className="terminal">
              <div className="terminal-bar">
                <div className="t-dot t-red" />
                <div className="t-dot t-yellow" />
                <div className="t-dot t-green" />
                <span className="terminal-title">{block.language ? `code (${block.language})` : "code"}</span>
              </div>
              <pre className="terminal-body">{block.code}</pre>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
