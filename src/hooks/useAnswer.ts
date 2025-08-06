import { create } from "zustand";

interface answerStore {
  answer: string | null;
  setAnswer: (state: string) => void;
}
export const useAnswer = create<answerStore>((set) => ({
  answer: null,
  setAnswer: (state: string) => set({ answer: state }),
}));
