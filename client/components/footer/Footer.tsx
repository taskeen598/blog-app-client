import Image from "next/image";

const Footer = () => {
  return (
    <div className="my-8 flex justify-center">
      <div className="bg-[#E8EDF5] rounded-[40px] md:p-20 max-w-[1600px] px-4 py-10 border border-blue-300 hover:border-white w-full">
        <div className="flex md:flex-row flex-col md:justify-between">
          <div className="flex flex-col items-start gap-3 mb-5">
            <Image
              src={"/images/logo-day.svg"}
              className="rounded-ful"
              alt={`s profile picture`}
              width={100}
              height={100}
            />
            <p className="md:w-[340px] text-justify mt-4">
              When an unknown prnoto sans took a galley and scrambled it to make
              specimen book not only five When an unknown prnoto sans took a
              galley and scrambled it to five centurie.
            </p>
            <p className="text-[#364363] font-bold text-lg">Address</p>
            <p>123 Main Street</p>
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className="text-lg text-[#364363]">Categories</p>
            <div className="grid text-left md:grid-cols-2 sm:grid-cols-1 gap-4 md:mt-4">
              <p>Action</p>
              <p>Animal</p>
              <p>Business</p>
              <p>Dental</p>
              <p>Adventure</p>
              <p>Biology</p>
              <p>Canada</p>
              <p>Design</p>
            </div>
          </div>
          {/* <div className="flex flex-col items-start gap-3">
            <p className="text-lg text-[#364363] mt-4">Letters</p>
            <div className="text-left md:w-[340px] md:mt-4">
              <p>Sign up to be first to receive the latest stories inspiring us, case studies, and industry news.</p>
            </div>
          </div> */}
        </div>
        <div className="bg-[#E8EDF5] border border-slate-300 hover:border-white w-full mt-10"></div>
        <div className="flex md:flex-row flex-col md:justify-between mt-10 text-center text-sm">
          <div>
            <p className="text-black">
              &#169; @2023 Created by{" "}
              <span className="text-blue-400">Taskeen Haider</span>
            </p>
          </div>
          <div className="flex md:flex-row flex-col gap-3 mt-3">
            <p>Twitter</p>
            <p>Instgram</p>
            <p>Facebook</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
