// src/components/Navbar.jsx
import React from "react";
import { RiMenu3Fill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="md:hidden sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-2xl font-bold tracking-tight cursor-pointer">
          FlexBug
        </h1>

        <div className="flex items-center gap-5 text-xl">
          <button className="hover:scale-110 transition cursor-pointer"><span> <FaRegUserCircle/> </span></button>
          <button className="hover:scale-110 transition cursor-pointer"><span> <RiMenu3Fill/> </span></button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;