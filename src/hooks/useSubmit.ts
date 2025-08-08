import { useConversation } from "@/store/useCoversation";
import { useMessage } from "../store/useMessage";
import { useChat } from "@ai-sdk/react";

export function useSubmit() {
  const { messages, sendMessage } = useChat();
  const message = useMessage((state) => state.message);
  const clearMessage = useMessage((state) => state.clearMessage);
  const setMessages = useConversation((state) => state.setMessages);

  async function submit() {
    if (!message) return;
    const prompt = message;
    clearMessage();
    sendMessage({ text: prompt });
  }
  setMessages(messages);

  return { message, submit };
}
