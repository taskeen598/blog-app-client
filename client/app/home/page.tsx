import React from "react";
import Button from "@/components/categories/Button";
import Recent from "@/components/recent/Recent";
import Footer from "@/components/footer/Footer";
const Home = () => {
  return (
    <>
      <div className="text-center flex justify-center items-center flex-col mx-2">
        <div>
          <div className="text-md mb-4 font-bold mt-24 text-[#7E9CC7]">
            Welcome to our blog
          </div>
          <div className="md:text-7xl text-4xl font-bold mb-4">
            <p className="text-[#344161]">
              Being&nbsp;
              <span className="bg-gradient-to-r from-blue-400 via-[#0CB8DF] to-[#0CC9D6] text-transparent bg-clip-text">
                Unique&nbsp;
              </span>
              <span className="">is better</span>
            </p>
          </div>
          <div className="md:text-7xl text-4xl font-bold mb-4 ">
            <p className="text-[#344161]">
              than being&nbsp;
              <span className="bg-gradient-to-r from-blue-400 via-[#0CB8DF] to-[#0CC9D6] text-transparent bg-clip-text">
                Erfect
              </span>
            </p>
          </div>
        </div>
        <div>
          <Button />
          <Recent />
        </div>
      </div>
      <div className="md:mx-28 mx-2">
        <Footer />
      </div>
    </>
  );
};

export default Home;
