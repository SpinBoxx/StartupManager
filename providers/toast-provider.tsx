"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface Props {
  children: ReactNode;
}

export default function ToastProvider() {
  return <Toaster />;
}
