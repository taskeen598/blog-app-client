"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Comments from "@/components/comments/Comment";
import useBlogStore from "@/zustand/blog.zustand";
import WriteComment from "@/components/writeComments/WriteComment";
import {ReactionBarSelector} from "@charkour/react-reactions"
import useReactionStore from "@/zustand/reaction.zustand";

const Blog = ({ params }: { params: { id: string } }) => {
  const { getSingleBlog, singleBlog } = useBlogStore();
  const { handleReaction } = useReactionStore();
  const [user, setuser] = useState<any>();
  const [reactionCounts, setReactionCounts] = useState({
    happy: 0,
    satisfaction: 0,
    sad: 0,
    love: 0,
    surprise: 0,
    angry: 0,
  });

  const [userReaction, setUserReaction] = useState<string | null>(null);

  const giveReaction = async (key: string) => {
    if (userReaction === key) {
      await Promise.all([handleReaction(key, params.id),getSingleBlog(params.id)]);
      setUserReaction(null);
      setReactionCounts((pervCounts: any) => ({
        ...pervCounts,
        [key]: pervCounts[key] - 1,
      }));
    } else if (!userReaction) {
      await Promise.all([handleReaction(key, params.id),getSingleBlog(params.id)]);
      setUserReaction(key);
      setReactionCounts((pervCounts: any) => ({
        ...pervCounts,
        [key]: pervCounts[key] + 1,
      }));
    } else {
      await Promise.all([handleReaction(key, params.id),getSingleBlog(params.id)]);
      setReactionCounts((prevCounts: any) => ({
        ...prevCounts,
        [userReaction]: prevCounts[userReaction] - 1,
      }));
      setUserReaction(key);
      setReactionCounts((prevCounts: any) => ({
        ...prevCounts,
        [key]: prevCounts[key] + 1,
      }));
    }
  };

  useEffect(() => {
    const isAuthExist: any = localStorage.getItem('Auth');
    const Auth: any = JSON.parse(isAuthExist);
    const user: any = Auth?.state?.user;
    setuser(user)
  }, [])
  

  useEffect(() => {
    const fetchData = async () => {
      // Make sure getSingleBlog returns the reactionCounts
      const counts: any = await getSingleBlog(params.id);
      setUserReaction(counts?.userReaction?.reactionType);
      // Update the reactionCounts state based on the reactions state
      setReactionCounts({
        happy: counts?.reactionCounts?.happy || 0,
        satisfaction: counts?.reactionCounts?.satisfaction || 0,
        sad: counts?.reactionCounts?.sad || 0,
        love: counts?.reactionCounts?.love || 0,
        surprise: counts?.reactionCounts?.surprise || 0,
        angry: counts?.reactionCounts?.angry || 0,
      });
    };
    fetchData();
  }, [params.id]);

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

  function calculateReadingTime(text: any) {
    const wordsPerMinute = 120;
    const wordCount = text?.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
    return readingTimeMinutes;
  }

  return (
    <div className="text-center mx-5">
      <div className="bg-[hsl(217,39%,94%)] border border-slate-300 hover:border-white md:mx-48 mt-10"></div>
      <div className="text-center  flex justify-center items-center">
        <p className="md:text-4xl md:max-w-[700px]  pt-10 pb-4 bg-gradient-to-r from-blue-400 via-[#0CB8DF] to-[#0CC9D6] text-transparent bg-clip-text text-4xl font-bold">
          {singleBlog?.title}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={singleBlog?.image || "/images/img.jpg"}
          className="rounded-xl"
          alt={`s blog picture`}
          width={800}
          height={200}
        />
      </div>
      <div className="flex justify-center text-center p-5 mt-10">
        <div className="py-6 flex md:flex-row sm:flex-row  bg-[#E8EDF5] border border-dashed border-blue-400 rounded-2xl p-4 flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div>
                <Image
                  src={singleBlog?.user?.profileImage || "/images/banner.png"}
                  className="rounded-full"
                  alt={`s profile picture`}
                  width={50}
                  height={50}
                />
              </div>
              <div className="flex flex-col text-left">
                <p className="text-sm text-[#4E658A]">
                  {singleBlog?.user?.name}
                </p>
                <p className="text-[12px]">{formatDate(singleBlog)}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3 flex-col text-right">
            <div className="flex flex-col justify-between text-[12px]">
              <p className="space-x-2">
                {singleBlog?.tags?.map((tag: any, index: number) => {
                  return <span key={index}>#{tag}</span>;
                })}
              </p>
              <p className="text-[#4E658A] font-bold">
                {calculateReadingTime(singleBlog?.description)} mins read{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <p className="md:max-w-[800px] text-justify my-5">
            {singleBlog.description}
          </p>
        </div>
        <div className="flex justify-center items-center">
        <div className='mt-6 md:w-[550px] sm:w-96 flex flex-col md:flex-row justify-center md:justify-between items-center w-full gap-2'>
          {
            user?.role === 'user' &&
            <ReactionBarSelector style={{ background: "White", padding: '10px', border: '1px solid #ffffff' }} iconSize={20} onSelect={giveReaction} />
          }
          <div className='flex flex-wrap space-x-3 '>
            {reactionCounts.happy > 0 && <span className='flex flex-col items-center text-yellow-500'><span>😆</span> {reactionCounts.happy}</span>}
            {reactionCounts.satisfaction > 0 && <span className='flex flex-col items-center text-yellow-500'><span>👍</span>{reactionCounts.satisfaction}</span>}
            {reactionCounts.sad > 0 && <span className='flex flex-col items-center text-yellow-500'><span>😢</span>{reactionCounts.sad}</span>}
            {reactionCounts.love > 0 && <span className='flex flex-col items-center text-red-500'><span>❤</span> {reactionCounts.love}</span>}
            {reactionCounts.surprise > 0 && <span className='flex flex-col items-center text-yellow-500'><span>😮</span> {reactionCounts.surprise}</span>}
            {reactionCounts.angry > 0 && <span className='flex flex-col items-center text-red-500'><span>😡</span> {reactionCounts.angry}</span>}
          </div>
        </div>
        </div>
        <div className="bg-[rgb(232,237,245)] border border-slate-300 md:mx-48 my-5"></div>
      </div>

      <div className="flex justify-center items-center">
        <Comments />
      </div>
    </div>
  );
};

export default Blog;