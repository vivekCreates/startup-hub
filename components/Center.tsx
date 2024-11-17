"use client";
import React, { useState } from "react";
// import SearchInput from "./SearchInput";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";

interface CenterProps {
  mainHeading?: string;
  heading?: string;
  input?: boolean;
  para?: string;
  height?: string;
  setSearchValue?:any; // Function type
  handleFormSubmit?:any
 

}

const Center: React.FC<CenterProps> = ({
  mainHeading,
  heading,
  input,
  para,
  height,
  setSearchValue,
}) => {
 
  
  return (
    <header
      className={`w-full h-[${height}vh] bg-pink-600 flex items-center justify-center flex-col gap-3`}
      style={{ height: `${height}vh` }}
    >
      {heading && (
        <h1 className="bg-yellow-500 text-black px-4 py-2 font-bold">
          {heading}
        </h1>
      )}

      <h1 className="bg-black w-[42.5rem] text-white text-[2.5rem] font-bold px-4 py-2 text-center">
        {mainHeading}
      </h1>
      {para && <p className="mb-4">{para}</p>}
      {input && (
        <div>
          <form action="">
            <div className="w-[34rem] h-14 rounded-3xl border-4 border-white flex bg-black">
              <input
                onChange={(e:any) => 
                  setSearchValue(e.target.value)
                }
                className="w-[85%] h-full px-6 py-2 bg-transparent border-none outline-none text-[1.2rem]"
                type="text"
                name=""
                id=""
                placeholder="Search"
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Center;
