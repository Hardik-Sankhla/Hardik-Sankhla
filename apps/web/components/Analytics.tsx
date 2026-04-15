"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!gaId || !window.gtag) {
      return;
    }

    window.gtag("config", gaId, {
      page_path: pathname
    });
  }, [gaId, pathname]);

  return null;
}
