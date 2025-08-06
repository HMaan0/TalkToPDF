"use client";
import { useMessage } from "@/hooks/useMessage";

const Input = () => {
  const setMessage = useMessage((state) => state.setMessage);

  return (
    <input
      placeholder="Ask anything"
      className="font-sans w-full focus:outline-none placeholder:font-[600]"
      onChange={(e) => setMessage(e)}
    />
  );
};

export default Input;
