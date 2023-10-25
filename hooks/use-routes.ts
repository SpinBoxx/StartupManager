"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        label: "Import",
        href: "/import",
        active: pathname === "/import",
      },
      {
        label: "Paramètres",
        href: "/parametre",

        active: pathname === "/parametre",
      },
    ],
    [pathname]
  );

  return routes;
};
