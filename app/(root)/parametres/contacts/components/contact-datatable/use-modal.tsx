"use client";

import { Contact } from "@prisma/client";
import { create } from "zustand";

interface useStoreInterface {
  contact?: Contact;
  setData: (contact: Contact) => void;
  resetData: () => void;
  open: boolean;
  onOpen: () => void;
}

export const useModal = create<useStoreInterface>((set, get) => ({
  contact: undefined,
  open: false,
  onOpen: () => {
    set({ open: !get().open });
  },
  setData: async (contact: Contact) => {
    set({ contact, open: true });
  },
  resetData: () => {
    set({ contact: undefined });
  },
}));
