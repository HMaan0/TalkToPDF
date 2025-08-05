import { FaArrowUp } from "react-icons/fa6";
const Input = () => {
  return (
    <div className="flex flex-col justify-between border border-gray-500 bg-gray-700 pt-4 pb-2 px-4 w-[675px] h-28 rounded-t-xl">
      <input
        placeholder="Ask anything"
        className=" w-full focus:outline-none placeholder:font-[600]"
      />
      <div className="w-full flex justify-between items-center">
        <div></div>
        <button className="h-full p-3 hover:cursor-pointer border border-gray-500 rounded-2xl">
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default Input;
