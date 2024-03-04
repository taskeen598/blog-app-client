import Image from "next/image";
import WriteComment from "@/components/writeComments/WriteComment";

const Recent = () => {
  return (
    <>
    <div className="flex flex-col">
    <div className="flex flex-col text-left pt-10">
        
        <WriteComment />
        <div className="bg-[rgb(232,237,245)] border border-slate-300 my-16"></div>
      
        <p className="text-4xl font-bold mt-10">
          Comments
        </p>
      </div>
      <div className="flex md:flex-row flex-col my-8 gap-16">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div>
              <Image
                src={"/images/banner.png"}
                className="rounded-full"
                alt={`s profile picture`}
                width={30}
                height={30}
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-[#4E658A]">Taskeen Haider</p>
              <p className="text-sm">25 April 2023</p>
            </div>
          </div>
        </div>
        <div className="bg-[#E8EDF5] max-w-[500px] rounded-xl px-5 py-3 border border-dashed border-blue-400">
          <p className="text-justify">
            Tortor placerat bibendum consequat sapien, facilisi facilisi
            pellentesque morbi. Id consectetur ut vitae a massa a. Lacus ut
            bibendum sollicitudin fusce sociis mi. Dictum volutpat praesent
            ornare accumsan elit venenatis. Congue sodales nunc quis ultricies
            odio porta. Egestas mauris placerat leo phasellus ut sit.
          </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Recent;
