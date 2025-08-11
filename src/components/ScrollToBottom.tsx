import React, { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";

const ScrollToBottom = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isScrolledDown = scrollTop > 100;
      const isNearBottom = scrollTop + windowHeight >= documentHeight - 100;

      if (isScrolledDown) {
        setIsVisible(true);
      }

      if (isNearBottom) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToBottom}
      className="text-[#d0bbc7ea] fixed left-1/2 -translate-x-1/2 bottom-[150px] backdrop-blur-lg flex gap-2 px-2 py-1.5 rounded-full justify-center items-center font-sans text-sm bg-[#352c3c]/30 border border-[#37323e76] w-fit hover:bg-[#352c3c]/50 transition-all duration-200"
    >
      Scroll to bottom
      <IoChevronDown />
    </button>
  );
};

export default ScrollToBottom;
