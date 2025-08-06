"use client";

import { useAnswer } from "@/hooks/useAnswer";

const Playground = () => {
  const answer = useAnswer((state) => state.answer);
  const message =
    "what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows what tech stack this person knows ";
  return (
    <div className="w-[660px] flex flex-col gap-10 font-sans">
      <div className="bg-gray-700 p-4 rounded-xl w-fit ml-auto max-w-5/6">
        {message}
      </div>
      <div>{answer}</div>
    </div>
  );
};

export default Playground;
