"use client";

import React, { useState } from "react";
import { protocols } from "./protocols";
import Image from "next/image";

function Procedure() {
  const [procedureCount, setProcedureCount] = useState(1);
  const [array, setArray] = useState(protocols[0]);
  console.log(protocols.length);

  const next = () => {
    if (procedureCount < protocols.length) {
      setProcedureCount((prevCount) => prevCount + 1); // Increment procedureCount
      setArray(protocols[procedureCount]); // Update array based on new procedureCount
    }
  };

  // Function to handle prev button click
  const prev = () => {
    if (procedureCount > 1) {
      setProcedureCount((prevCount) => prevCount - 1); // Decrement procedureCount
      setArray(protocols[procedureCount - 2]); // Update array based on new procedureCount
    }
  };

  return (
    // <div className="justify-center">
    //   <div className="flex flex-row justify-center">
    //     <button onClick={prev}>PREV</button>
    //     <button onClick={next}>NEXT</button>
    //   </div>
    //   <div className="w-[70%] bg-white shadow-lg h-auto rounded-xl flex flex-col justify-center items-center">
    //     Protocol {procedureCount}
    //     <ol>
    //       <div className="w-[70%] flex text-pretty justify-center">
    //         {array.map((items) => (
    //           <li>{items}</li>
    //         ))}{" "}
    //       </div>
    //     </ol>
    //   </div>
    // </div>
    <div className="flex flex-col bg-white w-[90%] lg:w-[70%] mx-auto justify-center shadow-lg h-auto rounded-xl">
      <div className="flex flex-row w-full justify-between px-4 py-4">
        <button onClick={prev} className="flex justify-start">
          <Image
            src={"/next-svgrepo-com.svg"}
            width={20}
            height={20}
            alt="prev"
            className="transform rotate-180"
          />
        </button>
        <span className="font-mono font-bold">Protocol {procedureCount}</span>

        <button onClick={next} className="flex justify-end">
          <Image
            src={"next-svgrepo-com.svg"}
            width={20}
            height={20}
            alt="next"
          />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <ol className="list-decimal font-mono text-xs md:text-sm">
          <div className="flex flex-col text-left justify-center mx-10 py-6 ">
            {array.map((items, index) => (
              <li key={index} className="pb-4 break-words">
                {items}
              </li>
            ))}
          </div>
        </ol>
      </div>
    </div>
  );
}

export default Procedure;
