"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Optional: Customize the bar
NProgress.configure({ showSpinner: false });

export default function TopLoadingBar() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleDone = () => NProgress.done();

    // Start when pathname changes (basic simulation for App Router)
    handleStart();
    const timeout = setTimeout(handleDone, 500); // simulate delay

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
