"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useBlogStore from "@/zustand/blog.zustand";
import { useRouter } from "next/navigation";

const Blog = () => {
  const router = useRouter();
  const { getAllBlogs, blogs } = useBlogStore();
  useEffect(() => {
    getAllBlogs();
  }, []);

  const formatDate = (blog: any): string => {
    const dateString = blog.createdAt;
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  function getFirst84Characters(paragraph: string) {
    var first84Characters = paragraph.substring(0, 120);
    return first84Characters;
  }

  function getitleCharacter(title: string) {
    var first84Characters = title.substring(0, 70);
    return first84Characters;
  }

  function calculateReadingTime(text: any) {
    const wordsPerMinute = 120;
    const wordCount = text.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return readingTimeMinutes;
  }

  function handleSingleBlog(id: string) {
    router.push(`/blog/${id}`);
  }

  return (
    <div className="text-center cursor-pointer">
      <div className="bg-[#E8EDF5] border border-slate-300 hover:border-white md:mx-48 my-10"></div>
      {blogs.map((blog: any) => {
        return (
          <div
            key={blog?._id}
            className="flex justify-center text-center"
            onClick={() => handleSingleBlog(blog?._id)}
          >
            <div className="py-6 max-w-[50rem] md:h-[16rem] border border-slate-300  flex md:flex-row sm:flex-row bg-white p-5 rounded-lg mb-4 hover:bg-slate-100 flex-col gap-5">
              <div className="flex flex-col border border-slate-300 bg-slate-100 rounded-lg p-3 gap-2">
                <div className="flex gap-2 ">
                  <div>
                    <Image
                      src={blog?.user?.profileImage || "/images/author.png"}
                      className="rounded-full"
                      alt={`s profile picture`}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-left">
                    <p className="text-[#4E658A] text-[14px] font-bold">
                      {blog?.user?.name}
                    </p>
                    <p className="text-[12px]">{formatDate(blog)}</p>
                    <button className="text-slate-700 bg-slate-300 w-auto px-2 py-1 text-center rounded-full hover:bg-slate-400 text-[12px]">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 flex-col">
                <p className="font-bold text-[#344161] hover:text-blue-400 md:text-3xl text-left md:w-[500px] cursor-pointer">
                  {getitleCharacter(blog?.title)}
                </p>
                <p className="text-left text-[15px] md:w-[550px] sm:w-96">
                  {getFirst84Characters(blog?.description)}...
                </p>
                <div className="flex justify-between text-[12px]">
                  <p className="space-x-2">
                    {blog?.tags.map((tag: any, index: number) => {
                      return <span key={index}>#{tag}</span>;
                    })}
                  </p>
                  <p className="">
                    {calculateReadingTime(blog?.description)} mins read{" "}
                  </p>
                </div>
                <div className="flex gap-1">
                  {blog?.reactionCounts?.happy > 0 && (
                    <span className="flex flex-col items-center text-yellow-500">
                      <span>😆</span> {blog?.reactionCounts?.happy}
                    </span>
                  )}
                  {blog?.reactionCounts?.satisfaction > 0 && (
                    <span className="flex flex-col items-center text-yellow-500">
                      <span>👍</span>
                      {blog?.reactionCounts?.satisfaction}
                    </span>
                  )}
                  {blog?.reactionCounts?.sad > 0 && (
                    <span className="flex flex-col items-center text-yellow-500">
                      <span>😢</span>
                      {blog?.reactionCounts?.sad}
                    </span>
                  )}
                  {blog?.reactionCounts?.love > 0 && (
                    <span className="flex flex-col items-center text-red-500">
                      <span>❤</span> {blog?.reactionCounts?.love}
                    </span>
                  )}
                  {blog?.reactionCounts?.surprise > 0 && (
                    <span className="flex flex-col items-center text-yellow-500">
                      <span>😮</span> {blog?.reactionCounts?.surprise}
                    </span>
                  )}
                  {blog?.reactionCounts?.angry > 0 && (
                    <span className="flex flex-col items-center text-red-500">
                      <span>😡</span> {blog?.reactionCounts?.angry}
                    </span>
                  )}
                </div>
                {/* <div className="bg-[#E8EDF5] border"></div> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
