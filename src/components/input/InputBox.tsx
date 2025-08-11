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
    <div className="min-w-[60px] max-w-[685px] px-2.5 pt-2.5 backdrop-blur-xl border-[0.1px] border-b-0 border-[#27242c] rounded-t-3xl  flex justify-center items-center">
      <div className="backdrop-blur-lg flex flex-col justify-between border-b-0 border border-[#27242c] bg-[#352c3c]/30 pt-4 pb-2 px-4 w-[675px] max-h-full min-h-32 rounded-t-2xl">
        <Input />
        <div className=" w-full flex justify-between items-center ">
          <div>
            {file || loadingFile ? (
              <>
                <div className="relative border border-[#4a4454] items-center hover:bg-white/5 duration-100 justify-between p-2 flex gap-2 w-full rounded-xl shadow-md hover:shadow-lg transition-all hover:cursor-pointer group">
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

                  {file && (
                    <>
                      <p className="font-semibold truncate max-w-xs">{file}</p>
                      <div>
                        <button
                          className="hover:cursor-pointer absolute top-[-8px] right-[-7px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          onClick={removeFile}
                        >
                          <IoCloseCircle
                            size={23}
                            className=" hover:opacity-70 duration-100 transition-all"
                          />
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
    </div>
  );
};

export default InputBox;
