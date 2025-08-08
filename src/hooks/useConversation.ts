// import { create } from "zustand";

// interface Conversation {
//   id: number;
//   prompt: string;
//   answer: string | null;
// }

// interface ConversationStore {
//   conversation: Conversation[];
//   setConversation: (state: Conversation) => void;
//   updateConversation: (id: number, answer: string) => void;
// }

// export const useConversation = create<ConversationStore>((set) => ({
//   conversation: [],
//   setConversation: (newState) =>
//     set((prevState) => ({
//       conversation: [...prevState.conversation, newState],
//     })),
//   updateConversation: (id, answer) =>
//     set((prevState) => ({
//       conversation: prevState.conversation.map((conv) =>
//         conv.id === id ? { ...conv, answer } : conv
//       ),
//     })),
// }));
