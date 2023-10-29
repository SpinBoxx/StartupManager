"use client";

import { useSettingsRoutes } from "@/hooks/use-settings-routes";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const BddManagerSection = () => {
  const sections = useSettingsRoutes();

  return (
    <div className="mt-1.5 rounded-md bg-white p-1 shadow-sm">
      {sections
        .find((section) => section.section === "GESTION_BDD")
        ?.routes.map((route) => (
          <Link
            href={route.href}
            className="border-g flex cursor-pointer items-center rounded-md border-b p-2 hover:bg-input"
          >
            <route.icon className="mr-3 h-4 w-4" /> <span>{route.label}</span>{" "}
            <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
    </div>
  );
};

export default BddManagerSection;
