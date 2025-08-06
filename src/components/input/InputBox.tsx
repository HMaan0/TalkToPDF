import Button from "./Button";
import Input from "./Input";
const InputBox = () => {
  return (
    <div className="flex flex-col justify-between border border-gray-500 bg-gray-700 pt-4 pb-2 px-4 w-[675px] h-28 rounded-t-xl">
      <Input />
      <div className="w-full flex justify-between items-center">
        <div></div>
        <Button />
      </div>
    </div>
  );
};

export default InputBox;
