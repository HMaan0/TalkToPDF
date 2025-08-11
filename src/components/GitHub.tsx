import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";

const GitHub = () => {
  return (
    <div className="bg-[#13131480] backdrop-blur-xs w-min p-1 sm:p-2  rounded-lg sm:rounded-xl right-4 top-4 fixed">
      <Link href={"https://github.com/hmaan0/TalkToPDF"} target="blank">
        <div className="p-2 sm:p-3 rounded-lg hover:bg-[#e1c5d519] transition-colors duration-150">
          <FaGithub className="text-3xl text-2xl" />
        </div>
      </Link>
    </div>
  );
};

export default GitHub;
