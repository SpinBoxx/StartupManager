import { ReactNode } from "react";
import Navbar from "./components/navbar";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Navbar /> {children}
    </div>
  );
};

export default MainLayout;
