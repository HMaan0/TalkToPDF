import { create } from "zustand";

type FileStore = {
  file: null | string;
  setFile: (fileName: string | null) => void;
  loadingFile: boolean;
  errorFile: boolean;
  setLoadingFileTrue: (state: boolean) => void;
  setErrorFileTrue: (state: boolean) => void;
};

export const useFile = create<FileStore>((set) => ({
  file: null,
  setFile: (filename: string | null) => set(() => ({ file: filename })),
  loadingFile: false,
  errorFile: false,
  setLoadingFileTrue: (state: boolean) => set(() => ({ loadingFile: state })),
  setErrorFileTrue: (state: boolean) => set(() => ({ errorFile: state })),
}));
