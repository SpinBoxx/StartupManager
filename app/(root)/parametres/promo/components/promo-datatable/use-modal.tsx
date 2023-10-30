"use client";

import { Promo } from "@prisma/client";
import { create } from "zustand";

interface useStoreInterface {
  promo?: Promo;
  setData: (promo: Promo) => void;
  resetData: () => void;
  open: boolean;
  onOpen: () => void;
}

export const useModal = create<useStoreInterface>((set, get) => ({
  promo: undefined,
  open: false,
  onOpen: () => {
    set({ open: !get().open });
  },
  setData: async (promo: Promo) => {
    set({ promo, open: true });
  },
  resetData: () => {
    set({ promo: undefined });
  },
}));
