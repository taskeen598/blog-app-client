'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import useBlogStore from "@/zustand/blog.zustand";

interface IComments {
  comments: [];
  blogId: string;
}

const WriteComment = ({ comments, blogId }: IComments) => {
  const [user, setUser] = useState<any>()
  const router = useRouter();  
  const { createComment, singleBlog } = useBlogStore();
  const [commentData, setCommentData] = useState({
    content: '',
  });

  useEffect(() => {
    const isAuthExist: any = localStorage.getItem('Auth');
    const Auth: any = JSON.parse(isAuthExist);
    const user: any = Auth?.state?.user;
    setUser(user)
  }, [])
  

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const isAuthExist: any = localStorage.getItem('Auth');
    const Auth: any = JSON.parse(isAuthExist);
    if (!Auth?.state?.token || Auth?.state?.token === '') {
      router.push('/auth/login');
    }
    const id = blogId;
    console.log("This is blog id",id);
    
    createComment(singleBlog._id, commentData);
    setCommentData({ content: '' });
  };

  return (
    <div className="max-w-[500px]">
      {user?.role === 'user' &&
        <>
          <p className="text-[#8097B9] text-3xl font-bold">Leave a Comment</p>
          <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 mt-5 rounded-xl p-2 text-sm">
            <h1 className="text-center text-slate-500 text-xl font-bold col-span-6">
              Give Comment!
            </h1>
            <textarea
              placeholder="Your feedback..."
              className="bg-[#F9FBFF] text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-dashed"
              name='content'
              id='content'
              value={commentData.content}
              onChange={handleChange}
            ></textarea>
            <span className="col-span-2"></span>
            
            <button 
              className="bg-[#F9FBFF] stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-[#F9FBFF] hover:text-white focus:stroke-blue-200 focus:bg-[#E8EDF5]"
              onClick={handleSubmit}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
                ></path>
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M10.11 13.6501L13.69 10.0601"
                ></path>
              </svg>
            </button>      
          </div>
        </>
      }
    </div>
  );
  
};

export default WriteComment;