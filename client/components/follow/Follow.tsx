import Image from "next/image";
const Follow = () => {
  return (
      <div className="grid md:grid-cols-1 sm:grid-cols-1 gap-3 my-8 md:w-[47rem] ">
        <div className="bg-[#E8EDF5] rounded-xl p-5 border border-blue-300 hover:border-white max-w-[370px]">
          <div className="flex text-[#7E9CC7] justify-between">
            <p className="text-sm">#</p>
            <div className="flex gap-2 text-slate-400">
            <Image
                src={"/images/timer.png"}
                className="rounded-ful"
                alt={`s profile picture`}
                width={20}
                height={15}
              />
              <p className="text-sm">mins read</p>
            </div>
            
          </div>
          <div className="py-6">
            <p className="font-bold text-[#344161] hover:text-blue-400 text-xl text-left cursor-pointer">
              Are You Ready To Go Home After The Sunset View?
            </p>
          </div>
          <div className="flex text-[#7E9CC7] justify-between">
            <div className="flex gap-2">
              <Image
                src={"/images/banner.png"}
                className="rounded-full"
                alt={`s profile picture`}
                width={30}
                height={30}
              />
              <p className="text-sm mt-3">25 April 2023</p>
            </div>
            <div>
            <p className="bg-blue-200 py-1 px-2 mt-2 rounded-full text-sm hover:text-blue-800 cursor-pointer">
              Read More
            </p>
            </div>
          </div>
        </div>
      </div>

  );
};

export default Follow;