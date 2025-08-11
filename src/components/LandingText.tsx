"use client";

import { useMessage } from "@/store/useMessage";

const LandingText = () => {
  const setHomepageText = useMessage((state) => state.setHomepageText);

  return (
    <>
      <div className=" w-11/12 max-w-[660px] flex flex-col gap-10 font-sans m-auto mt-20 font-">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            What can I help you discover today?
          </h1>
          <h6 className="text-lg sm:text-2xl font-semibold">
            Upload a PDF and get clear, AI-powered answers.
          </h6>
        </div>
        <div className="flex flex-col gap-1  sm:text-lg text-[#d0bbc7ea]">
          <div className="flex flex-col gap-1">
            <button
              onClick={() =>
                setHomepageText("How does this app read and understand my PDF?")
              }
              className="text-start hover:cursor-pointer transition-colors duration-150 w-full p-2 hover:bg-[#e1c5d50b] rounded-lg"
            >
              How does this app read and understand my PDF?
            </button>
            <div className="border-b border-[#6f5d6746]"></div>
          </div>
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setHomepageText("What file formats can I upload?")}
              className="text-start hover:cursor-pointer transition-colors duration-150 w-full p-2 hover:bg-[#e1c5d50b] rounded-lg"
            >
              What file formats can I upload?
            </button>
            <div className="border-b border-[#6f5d6746]"></div>
          </div>{" "}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setHomepageText("Can I ask follow-up questions?")}
              className="text-start hover:cursor-pointer transition-colors duration-150 w-full p-2 hover:bg-[#e1c5d50b] rounded-lg"
            >
              Can I ask follow-up questions?
            </button>
            <div className="border-b border-[#6f5d6746]"></div>
          </div>{" "}
          <div className="flex flex-col gap-1">
            <button
              onClick={() =>
                setHomepageText("Tell me something fun about PDFs!")
              }
              className="text-start hover:cursor-pointer transition-colors duration-150 w-full p-2 hover:bg-[#e1c5d50b] rounded-lg"
            >
              Tell me something fun about PDFs!
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingText;
