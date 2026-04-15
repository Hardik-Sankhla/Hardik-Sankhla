import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import Analytics from "../components/Analytics";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

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
        url: "/assets/images/hero-background.webp",
        width: 900,
        height: 879,
        alt: "Hardik Sankhla AI Systems Engineering"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Hardik Sankhla | AI Systems Engineer",
    description:
      "Case studies and practical guides on building production AI systems, ML platforms, and reliable model workflows.",
    images: ["/assets/images/hero-background.webp"]
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <body>
        {gaId ? (
          <>
            <Script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <Script id="gtag" strategy="afterInteractive">
              {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: true });
              `.trim()}
            </Script>
            <Analytics gaId={gaId} />
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
