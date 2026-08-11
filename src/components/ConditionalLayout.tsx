"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { BookingBar } from "@/components/BookingBar";
import { useEffect, useState } from "react";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const [scrolledIntoMain, setScrolledIntoMain] = useState(false);

  // On the landing page, the header stays hidden until the scroll-driven
  // hero fades out and reveals the main content beneath it.
  useEffect(() => {
    if (!isLanding) return;
    setScrolledIntoMain(false);

    const target = document.getElementById("landing-main-content");
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setScrolledIntoMain(entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, [isLanding]);

  const shouldHideHeader = isLanding && !scrolledIntoMain;

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
      {!shouldHideHeader && <BookingBar />}
    </>
  );
}
