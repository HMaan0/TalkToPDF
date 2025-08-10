"use client";
import { useFile } from "@/store/useFile";
import Button from "./Button";
import Input from "./Input";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { IoCloseCircle } from "react-icons/io5";
import LoadingSpinner from "../loading/LoadingSpinner";
import { BiError } from "react-icons/bi";
import { deleteCollection } from "@/lib/vectorDB";
const InputBox = () => {
  const file = useFile((state) => state.file);
  const loadingFile = useFile((state) => state.loadingFile);
  const errorFile = useFile((state) => state.errorFile);
  const setFile = useFile((state) => state.setFile);
  const setLoadingFileTrue = useFile((state) => state.setLoadingFileTrue);
  const setErrorFileTrue = useFile((state) => state.setErrorFileTrue);
  async function removeFile() {
    setFile(null);
    setLoadingFileTrue(false);
    setErrorFileTrue(false);
    await deleteCollection("pdf_chunks");
  }
  return (
    <div className="flex flex-col justify-between border border-gray-500 bg-gray-700 pt-4 pb-2 px-4 w-[675px] max-h-full min-h-32 rounded-t-xl">
      <Input />
      <div className=" w-full flex justify-between items-center ">
        <div>
          {file || loadingFile ? (
            <>
              <div className="border border-gray-500 p-2 flex gap-2 w-full rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 ">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-xl flex justify-center items-center  shadow-md">
                  {file ? (
                    <DocumentTextIcon className="w-7 h-7" />
                  ) : (
                    <>
                      {errorFile ? (
                        <BiError size={30} />
                      ) : (
                        loadingFile && <LoadingSpinner />
                      )}
                    </>
                  )}
                </div>
                {file && (
                  <>
                    <div className="flex flex-col justify-between">
                      <p className="font-semibold truncate max-w-xs">{file}</p>
                      <p className="text-sm font-semibold">PDF</p>
                    </div>
                    <div>
                      <button
                        className="hover:cursor-pointer"
                        onClick={removeFile}
                      >
                        <IoCloseCircle size={20} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : null}
        </div>
        <div className="h-min">
          <Button />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
