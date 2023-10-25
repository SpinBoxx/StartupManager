"use client";

import Container from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRoutes } from "@/hooks/use-routes";
import { LogOut, MenuIcon, X } from "lucide-react";
import { ElementRef, useRef, useState } from "react";

const Navbar = () => {
  const routes = useRoutes();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const sidebarRef = useRef<ElementRef<"aside">>(null);

  const collapse = () => {
    setIsCollapsed(true);
    if (sidebarRef.current) {
      sidebarRef.current.classList.remove("translate-x-0");
      sidebarRef.current.classList.add("-translate-x-full");
    }
  };

  const resetWidth = () => {
    if (sidebarRef.current) {
      setIsCollapsed(false);

      sidebarRef.current.classList.remove("-translate-x-full");
      sidebarRef.current.classList.add("translate-x-0");
    }
  };

  return (
    <div className=" w-full py-3 shadow-md ">
      <aside className="relative">
        <aside
          ref={sidebarRef}
          className="fixed inset-0 left-0 top-0  flex h-full w-2/3 bg-gray-200 transition-all duration-300 ease-in-out"
        >
          <Button
            onClick={collapse}
            className="absolute right-3 top-2"
            variant="outline"
            size="icon"
          >
            <X />
          </Button>{" "}
          <div className="z-40 flex flex-col gap-4 px-4 py-3">
            <div>
              <Button variant="ghost">Bonjour</Button>
            </div>
            <div>
              <Button variant="ghost">Bonjour</Button>
            </div>
          </div>
        </aside>
      </aside>

      <Container>
        <div className="flex w-full items-center justify-between">
          <div>
            <div className="flex items-center">
              {isCollapsed && (
                <Button variant="outline" size="icon">
                  <MenuIcon
                    role="button"
                    onClick={resetWidth}
                    className="h-6 w-6 text-muted-foreground"
                  />
                </Button>
              )}
              <span className="ml-4 text-xl font-semibold">
                Startup Manager
              </span>
              <div className="hidden">Import</div>
            </div>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="select-none">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup></DropdownMenuGroup>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
