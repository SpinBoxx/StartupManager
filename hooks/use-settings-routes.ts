"use client";

import { GraduationCap, Home, Import, Settings, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useSettingsRoutes = () => {
  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        section: "GESTION_BDD",
        routes: [
          {
            label: "Utilisateurs",
            href: "/parametres/users",
            active: pathname === "/parametres/users",
            icon: User,
          },
          {
            label: "Promotions",
            href: "/parametres/promo",
            active: pathname === "/parametres/promo",
            icon: GraduationCap,
          },
        ],
      },
    ],
    [pathname]
  );

  return routes;
};