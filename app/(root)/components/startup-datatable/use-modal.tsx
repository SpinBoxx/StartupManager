"use client";

import { Startup } from "@prisma/client";
import { create } from "zustand";

interface useStoreInterface {
  open: boolean;
  onOpen: () => void;
}

export const useModal = create<useStoreInterface>((set, get) => ({
  open: false,
  onOpen: () => {
    set({ open: !get().open });
  },
}));
