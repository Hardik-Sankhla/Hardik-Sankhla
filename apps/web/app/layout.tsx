import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://hardik-sankhla.github.io"),
  title: {
    default: "Hardik Sankhla | AI Systems Engineer",
    template: "%s | Hardik Sankhla"
  },
  description:
    "Production-grade portfolio and documentation platform focused on AI systems engineering, ML delivery, and applied product thinking.",
  keywords: [
    "Hardik Sankhla",
    "AI Systems Engineer",
    "ML Engineer",
    "MLOps",
    "LLM Engineering",
    "AI Portfolio"
  ],
  openGraph: {
    title: "Hardik Sankhla | AI Systems Engineer",
    description:
      "Explore case studies, engineering guides, and production-grade AI system work by Hardik Sankhla.",
    url: "https://hardik-sankhla.github.io",
    siteName: "Hardik Sankhla",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/images/HardikSankhlaLinkedinProfileBackground.png",
        width: 1200,
        height: 630,
        alt: "Hardik Sankhla AI Systems Engineering"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardik Sankhla | AI Systems Engineer",
    description:
      "Case studies and practical guides on building production AI systems, ML platforms, and reliable model workflows.",
    images: ["/assets/images/HardikSankhlaLinkedinProfileBackground.png"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
