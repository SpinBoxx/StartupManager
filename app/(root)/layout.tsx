import { ReactNode } from "react";
import Navbar from "./components/navbar";
import Container from "@/components/container";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <Container className="mt-4">{children}</Container>
    </div>
  );
};

export default MainLayout;
