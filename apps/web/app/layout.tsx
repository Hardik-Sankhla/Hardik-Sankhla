import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Hardik Sankhla | AI Systems Hub",
  description: "Portfolio and AI systems knowledge hub"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
