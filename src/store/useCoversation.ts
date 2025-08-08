import { UIMessage } from "@ai-sdk/react";
import { UIDataTypes, UITools } from "ai";
import { create } from "zustand";

interface messageStore {
  messages: UIMessage<unknown, UIDataTypes, UITools>[];
  setMessages: (messages: UIMessage<unknown, UIDataTypes, UITools>[]) => void;
}
export const useConversation = create<messageStore>((set) => ({
  messages: [],
  setMessages: (state: UIMessage<unknown, UIDataTypes, UITools>[]) =>
    set(() => ({ messages: state })),
}));
