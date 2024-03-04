import React from "react";
import Link from "next/link";
import Logo from "./Logo";
import Button from "./Button";
import { FiEdit } from "react-icons/fi";

const Navbar = ({ toggle }: { toggle: () => void }) => {
  return (
    <>
      <div className="w-full h-20 bg-[#F9FBFF] sticky top-0 mt-5">
        <div className="container mx-auto md:px-14 px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <Logo />
            <button
              type="button"
              className="inline-flex items-center md:hidden text-black"
              onClick={toggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#000"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>

            <ul className="hidden md:flex gap-x-6 text-slate-500">
              <li>
                <Link href="/home">
                  <p>Home</p>
                </Link>
              </li>
              {/* <li>
                <Link href="/category">
                  <p>Category</p>
                </Link>
              </li> */}
              <li>
                <Link href="/blog">
                  <p>Blogs</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About Us</p>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <p>Contact</p>
                </Link>
              </li>
            </ul>
            <div className="hidden md:block text-red-500">
              {/* <div className="flex text-slate-500"><p className="text-slate-500">Write</p><FiEdit /></div> */}
              <div>
                <Button />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
