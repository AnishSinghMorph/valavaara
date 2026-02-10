"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import { ReleaseMarquee } from "@/components/ReleaseMarquee";
import { BookingBar } from "@/components/BookingBar";
import { useEffect } from "react";

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideHeaderRoutes = ["/"];
  const shouldHideHeader = hideHeaderRoutes.includes(pathname);

  // Manage body overflow based on route
  useEffect(() => {
    if (pathname === "/") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [pathname]);

  return (
    <>
      {!shouldHideHeader && (
        <>
          <Header />
          <ReleaseMarquee />
        </>
      )}
      {children}
      {!shouldHideHeader && <BookingBar />}
    </>
  );
}
