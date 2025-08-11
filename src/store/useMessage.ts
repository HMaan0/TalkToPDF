import { create } from "zustand";

interface messageStore {
  message: string | null;
  setMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setHomepageText: (text: string) => void;
  clearMessage: () => void;
}
export const useMessage = create<messageStore>((set) => ({
  message: null,
  setMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    set(() => ({ message: e.target.value })),
  setHomepageText: (text: string) => set(() => ({ message: text })),
  clearMessage: () => set(() => ({ message: null })),
}));
