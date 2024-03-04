"use client";

import useAuthStore from "@/zustand/auth.zustand";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Button = () => {
  const { token, signout } = useAuthStore();
  const [flag, setFlag] = useState(false);
  const [loggedIn, setIsLoggedin] = useState()
  const router = useRouter();

  useEffect(() => {
    let a: any = localStorage.getItem("Auth");
    a = JSON.parse(a);
    let b = a?.state?.token;
    setIsLoggedin(a?.state?.isLoggedin)
    // if (b) {
    //   setFlag(true);
    // } else {
    //   setFlag(false);
    // }
  }, [token]);

  const handleSignOut = () => {
    signout();
  };

  const handleWriteBlog = () => [
      router.push("/writeblog")
  ]
  return (
    <>
      <div className="flex gap-5">
        {loggedIn&&
          <div onClick={handleWriteBlog} className="flex gap-2 text-white bg-slate-500 px-5 py-2 rounded-lg hover:bg-slate-400 cursor-pointer">
          <p className="text-white pt-1">Write</p>
          <p className="text-white pt-2"> <FiEdit /></p>
        </div>
        }
        <Link href={'/login'}>
        <button className="h-12 rounded-lg bg-gradient-to-r from-blue-300 via-[#0CB8DF] to-[#0CC9D6] text-white font-bold px-5">
          {loggedIn ? <span onClick={handleSignOut}>Sign out</span> : "Sign In"}
        </button>
        </Link>
      </div>
    </>
  );
};

export default Button;
