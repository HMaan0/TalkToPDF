import { create } from "zustand";

type FileStore = {
  file: null | string;
  setFile: (fileName: string | null) => void;
  loadingFile: boolean;
  errorFile: boolean;
  errorMessage: string | null;
  setLoadingFileTrue: (state: boolean) => void;
  setErrorFileTrue: (state: boolean, error?: string) => void;
};

export const useFile = create<FileStore>((set) => ({
  file: null,
  setFile: (filename: string | null) => set(() => ({ file: filename })),
  loadingFile: false,
  setLoadingFileTrue: (state: boolean) => set(() => ({ loadingFile: state })),
  errorFile: false,
  errorMessage: null,
  setErrorFileTrue: (state: boolean, error?: string) =>
    set(() => ({ errorFile: state, errorMessage: error })),
}));
