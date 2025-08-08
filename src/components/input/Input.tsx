"use client";
import { useMessage } from "@/store/useMessage";

const Input = () => {
  const setMessage = useMessage((state) => state.setMessage);
  const message = useMessage((state) => state.message);

  return (
    <input
      placeholder="Ask anything"
      className="font-sans w-full focus:outline-none placeholder:font-[600]"
      value={message || ""}
      onChange={(e) => setMessage(e)}
    />
  );
};

export default Input;
