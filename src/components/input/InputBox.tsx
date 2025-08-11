"use client";
import { useFile } from "@/store/useFile";
import Button from "./Button";
import Input from "./Input";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { IoCloseCircle } from "react-icons/io5";
import LoadingSpinner from "../loading/LoadingSpinner";
import { BiError } from "react-icons/bi";
import { deleteCollection } from "@/lib/vectorDB";
import { FaPlus } from "react-icons/fa6";
import { upload } from "@/lib/actions/upload";
const InputBox = () => {
  const file = useFile((state) => state.file);
  const loadingFile = useFile((state) => state.loadingFile);
  const errorFile = useFile((state) => state.errorFile);
  const errorMessage = useFile((state) => state.errorMessage);
  const setFile = useFile((state) => state.setFile);
  const setLoadingFileTrue = useFile((state) => state.setLoadingFileTrue);
  const setErrorFileTrue = useFile((state) => state.setErrorFileTrue);
  async function removeFile() {
    setFile(null);
    setLoadingFileTrue(false);
    setErrorFileTrue(false);
    await deleteCollection("pdf_chunks");
  }
  function removeErrorOrLoading() {
    setFile(null);
    setLoadingFileTrue(false);
    setErrorFileTrue(false);
  }
  function openFolders() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,application/pdf";
    input.multiple = false;

    input.onchange = async (event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      console.log("Selected PDF files:", files);

      if (files && files.length > 0) {
        const file = files[0];
        try {
          setFile(null);
          setLoadingFileTrue(true);
          setFile(null);
          if (file.size > 1500000) {
            setErrorFileTrue(true, "File is too big");
            setFile;
            return;
          }

          const formData = new FormData();
          formData.append("file", file);
          const fileUploaded = await upload(formData);

          if (fileUploaded) {
            setFile(file.name);
          } else {
            setErrorFileTrue(true);
          }
        } catch (error) {
          setFile(null);
          setErrorFileTrue(true);
          console.error("Unable to upload", error);
        }
      }
    };

    input.click();
  }
  return (
    <div className="min-w-[60px] max-w-[685px] px-2.5 pt-2.5 backdrop-blur-xl border-[0.1px] border-b-0 bg-[#352c3c]/15 border-[#37323e24] rounded-t-3xl  flex justify-center items-center">
      <div className="backdrop-blur-lg flex flex-col justify-between border-b-0 border border-[#37323e4b] bg-[#352c3c]/20 pt-4 pb-2 px-4 w-[675px] max-h-full min-h-32 rounded-t-2xl">
        <Input />
        <div className=" w-full flex justify-between items-center ">
          <div>
            <div className="relative border border-[#4a4454] items-center hover:bg-white/5 duration-100 justify-between p-2 flex gap-2 w-full rounded-xl shadow-md hover:shadow-lg transition-all hover:cursor-pointer group">
              {file || loadingFile ? (
                <>
                  {file ? (
                    <DocumentTextIcon className="w-7 h-7" />
                  ) : (
                    <>
                      {errorFile ? (
                        <>
                          <BiError size={30} />
                          {errorMessage && (
                            <p className="font-semibold max-w-xs">
                              {errorMessage}
                            </p>
                          )}
                          <button
                            className="hover:cursor-pointer absolute top-[-8px] right-[-7px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            onClick={removeErrorOrLoading}
                          >
                            <IoCloseCircle
                              size={23}
                              className=" hover:opacity-70 duration-100 transition-all"
                            />
                          </button>
                        </>
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
                </>
              ) : null}
              {!file && !loadingFile && !errorFile && (
                <>
                  <button
                    className="flex justify-center items-center gap-2"
                    onClick={openFolders}
                  >
                    <FaPlus size={27} className="hover:cursor-pointer" />
                    <p className="font-sans font-semibold max-w-xs hover:cursor-pointer">
                      Add a PDF
                    </p>
                  </button>
                </>
              )}
            </div>
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
