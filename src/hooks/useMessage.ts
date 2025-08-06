import { create } from "zustand";

interface messageStore {
  message: string | null;
  setMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const useMessage = create<messageStore>((set) => ({
  message: null,
  setMessage: (e: React.ChangeEvent<HTMLInputElement>) =>
    set(() => ({ message: e.target.value })),
}));
