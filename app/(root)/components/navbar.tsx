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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRoutes } from "@/hooks/use-routes";
import { cn } from "@/lib/utils";
import { LogOut, MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { ElementRef, useRef, useState } from "react";

const Navbar = () => {
  const routes = useRoutes();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" w-full py-3 shadow-md ">
      <Container>
        <div className="flex w-full justify-between ">
          <div className="flex items-center">
            <Sheet
              open={sidebarOpen}
              onOpenChange={() => setSidebarOpen(!sidebarOpen)}
            >
              <SheetTrigger
                onClick={() => setSidebarOpen(true)}
                className="rounded-md border p-2 "
              >
                <MenuIcon className="h-5 w-5 text-muted-foreground" />
              </SheetTrigger>
              <SheetContent side="left" className="self-start">
                <SheetHeader className="text-left">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="z-40 mt-5 flex flex-col gap-4  py-3">
                  {routes.map((route) => (
                    <Link href={route.href}>
                      <Button
                        onClick={() => setSidebarOpen(false)}
                        variant="ghost"
                        className={cn(
                          "flex items-center gap-x-3 hover:bg-primary hover:text-white",
                          route.active && "bg-primary text-white"
                        )}
                      >
                        <route.icon />
                        {route.label}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>

            <span className="ml-4 text-xl font-semibold">Startup Manager</span>
            <div className="hidden">Import</div>
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
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Se déconnecter</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
