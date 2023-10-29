"use client";

import { fetchCustom } from "@/lib/custom-fetch";
import { User } from "@prisma/client";
import { create } from "zustand";

interface useStoreInterface {
  user?: User;
  setData: (user: User) => void;
  resetData: () => void;
  open: boolean;
  onOpen: () => void;
}

export const useModal = create<useStoreInterface>((set, get) => ({
  user: undefined,
  open: false,
  onOpen: () => {
    set({ open: !get().open });
  },
  setData: async (user: User) => {
    set({ user, open: true });
  },
  resetData: () => {
    set({ user: undefined });
  },
}));
