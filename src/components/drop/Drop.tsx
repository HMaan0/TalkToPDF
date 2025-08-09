import { PiFilePdf } from "react-icons/pi";

const Drop = () => {
  return (
    <section className="gap-4 text-white fixed inset-0 z-50 bg-black opacity-80 flex justify-center items-center flex-col">
      <div>
        <PiFilePdf size={100} />
      </div>
      <p className="text-5xl">Add PDF</p>
      <div className="text-2xl">Drop a pdf file to add it to conversation</div>
    </section>
  );
};

export default Drop;
