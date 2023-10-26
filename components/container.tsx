import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  return <div className={cn("w-full px-4", className)}>{children}</div>;
};

export default Container;
