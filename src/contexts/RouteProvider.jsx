"use client";

import { usePathname } from "next/navigation";
import { HomeProvider } from "./HomeContext";

export const RouteProvider = ({ children }) => {
  const pathname = usePathname();
  const isBlogPage = pathname.startsWith("/blog");

  if (!isBlogPage) {
    return <HomeProvider>{children}</HomeProvider>;
  }

  // For all other pages, just return children without additional context
  return <>{children}</>;
};
