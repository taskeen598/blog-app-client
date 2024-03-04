"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useBlogStore from "@/zustand/blog.zustand";

const Category = () => {
  const { getAllBlogs, blogs } = useBlogStore();
  useEffect(() => {
    const fetchBlogs = async () => {
      await getAllBlogs();
    };
    fetchBlogs();
  }, []);

  console.log(blogs);

  return (
    <div className="text-center">
      <p className="md:text-5xl pt-10 pb-4 bg-gradient-to-r from-blue-400 via-[#0CB8DF] to-[#0CC9D6] text-transparent bg-clip-text text-4xl font-bold">
        Category
      </p>
      <div className="bg-[#E8EDF5] border border-slate-300 hover:border-white md:mx-48 my-10"></div>
      <div className="flex justify-center text-center">
        <div className="py-6 flex md:flex-row sm:flex-row flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div>
                <Image
                  src={"/images/author.png"}
                  className="rounded-full"
                  alt={`s profile picture`}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-[#4E658A] font-bold">Taskeen Haider</p>
                <p className="">25 April 2023</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 flex-col">
            <p className="font-bold text-[#344161] hover:text-blue-400 md:text-3xl text-left md:w-[500px] cursor-pointer">
              Are You Ready To Go Home After The Sunset View?
            </p>
            <p className="text-left text-[15px] md:w-[550px] sm:w-96">
              Embrace remote work success with these invaluable tips and tricks
              for freelancers seeking productivity and work-life balance in
              their home offices
            </p>
            <div className="flex justify-between text-[12px]">
              <p className="">#history #home</p>
              <p className="">3 mins read </p>
            </div>
            <div className="flex justify-between text-left">
              <div className="flex gap-2">
                <p className="text-blue-400 text-[12px] mt-3">Like</p>
              </div>
              <div className="flex gap-2">
                <p className="text-red-400 text-[12px] mt-3">DisLike</p>
              </div>
              <div className="flex gap-2">
                <p className="text-green-400 text-[12px] mt-3">Comments</p>
              </div>
            </div>
            <div className="bg-[#E8EDF5] border"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-center">
        <div className="py-6 flex md:flex-row sm:flex-row flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div>
                <Image
                  src={"/images/author.png"}
                  className="rounded-full"
                  alt={`s profile picture`}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-[#4E658A] font-bold">Taskeen Haider</p>
                <p className="">25 April 2023</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 flex-col">
            <p className="font-bold text-[#344161] hover:text-blue-400 md:text-3xl text-left md:w-[500px] cursor-pointer">
              Are You Ready To Go Home After The Sunset View?
            </p>
            <p className="text-left text-[15px] md:w-[550px] sm:w-96">
              Embrace remote work success with these invaluable tips and tricks
              for freelancers seeking productivity and work-life balance in
              their home offices
            </p>
            <div className="flex justify-between text-[12px]">
              <p className="">#history #home</p>
              <p className="">3 mins read </p>
            </div>
            <div className="flex justify-between text-left">
              <div className="flex gap-2">
                <p className="text-blue-400 text-[12px] mt-3">Like</p>
              </div>
              <div className="flex gap-2">
                <p className="text-red-400 text-[12px] mt-3">DisLike</p>
              </div>
              <div className="flex gap-2">
                <p className="text-green-400 text-[12px] mt-3">Comments</p>
              </div>
            </div>
            <div className="bg-[#E8EDF5] border"></div>
          </div>
        </div>
      </div>
      <div className="flex justify-center text-center">
        <div className="py-6 flex md:flex-row sm:flex-row flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div>
                <Image
                  src={"/images/author.png"}
                  className="rounded-full"
                  alt={`s profile picture`}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-[#4E658A] font-bold">Taskeen Haider</p>
                <p className="">25 April 2023</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 flex-col">
            <p className="font-bold text-[#344161] hover:text-blue-400 md:text-3xl text-left md:w-[500px] cursor-pointer">
              Are You Ready To Go Home After The Sunset View?
            </p>
            <p className="text-left text-[15px] md:w-[550px] sm:w-96">
              Embrace remote work success with these invaluable tips and tricks
              for freelancers seeking productivity and work-life balance in
              their home offices
            </p>
            <div className="flex justify-between text-[12px]">
              <p className="">#history #home</p>
              <p className="">3 mins read </p>
            </div>
            <div className="flex justify-between text-left">
              <div className="flex gap-2">
                <p className="text-blue-400 text-[12px] mt-3">Like</p>
              </div>
              <div className="flex gap-2">
                <p className="text-red-400 text-[12px] mt-3">DisLike</p>
              </div>
              <div className="flex gap-2">
                <p className="text-green-400 text-[12px] mt-3">Comments</p>
              </div>
            </div>
            <div className="bg-[#E8EDF5] border"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
