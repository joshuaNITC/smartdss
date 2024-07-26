"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const data = [
  {
    id: 1,
    designation: "INFORMATION OFFICER",
    name: "Amit Sharma",
    phone: "8090701011",
    email: "amit.sharma@gmail.com",
  },
  {
    id: 2,
    designation: "HAZARD ANALYST",
    name: "Neha Verma",
    phone: "8090701012",
    email: "neha.verma@gmail.com",
  },
  {
    id: 3,
    designation: "DEOC",
    name: "Rakesh Singh",
    phone: "8090701013",
    email: "rakesh.singh@gmail.com",
  },
  {
    id: 4,
    designation: "RISK CONTROLLING OFFICER(DEPUTY COLLECTOR)",
    name: "Sonia Mehta",
    phone: "8090701014",
    email: "sonia.mehta@gmail.com",
  },
  {
    id: 5,
    designation: "RESPONSIBLE OFFICER(DISTRICT COLLECTOR)",
    name: "Anil Kumar",
    phone: "8090701015",
    email: "anil.kumar@gmail.com",
  },
  {
    id: 6,
    designation: "SECURITY TEAM",
    name: "Rajesh Gupta",
    phone: "8090701016",
    email: "rajesh.gupta@gmail.com",
  },
  {
    id: 7,
    designation: "RESCUE TEAM",
    name: "Priya Iyer",
    phone: "8090701017",
    email: "priya.iyer@gmail.com",
  },
  {
    id: 8,
    designation: "TRANSPORT & SAFETY",
    name: "Manish Patil",
    phone: "8090701018",
    email: "manish.patil@gmail.com",
  },
  {
    id: 9,
    designation: "MEDICAL AID",
    name: "Deepa Nair",
    phone: "8090701019",
    email: "deepa.nair@gmail.com",
  },
  // Add more rows as needed
];

const Page = () => {
  const [isChecked, setIsChecked] = useState(Array(data.length).fill(false));
  const [isSelectAll, setIsSelectAll] = useState(false);
  const router = useRouter();

  const handleSelectAll = () => {
    const newCheckedState = !isSelectAll;
    setIsSelectAll(newCheckedState);
    setIsChecked(Array(data.length).fill(newCheckedState));
  };

  const handleCheckboxChange = (index) => {
    const newCheckedState = [...isChecked];
    newCheckedState[index] = !newCheckedState[index];
    setIsChecked(newCheckedState);

    // Update the "Select All" checkbox state
    if (newCheckedState.every((checked) => checked)) {
      setIsSelectAll(true);
    } else {
      setIsSelectAll(false);
    }
  };

  const makeCall = async () => {
    
    router.push("/confirmation"); // add this after checking if resp is ok? for now I've added it here
    try {
      const response = await fetch("/api/makeCall", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // console.log(data.sid);
      console.log("call made");
    } catch (error) {
      console.error("Error making call:", error);
    }
  };

  return (
    <div
      className="h-screen pt-[5%] nav animate-fadeInDown"
      style={{
        backgroundImage: "url('/background.svg')",
      }}
    >
      <div className="bg-white/90 rounded-2xl w-[90%] h-[90%] mx-auto p-8 shadow-2xl">
        <div className="text-center pb-8">
          <h2 className="text-3xl font-bold text-gray-800">ESCALATE</h2>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            In lack of progress on a critical matter, we find it necessary to
            escalate this issue to your superiors for their immediate attention
            and intervention.
          </p>
        </div>
        <div className="h-[67%] overflow-y-auto mb-6">
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2">
                <div className="overflow-hidden shadow-md rounded-lg border border-gray-200">
                  <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                    <thead className="border-b border-neutral-200 font-medium dark:border-white/10 bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          #
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Designation
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Contacts
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Notify
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr
                          key={row.id}
                          className={`border-b border-neutral-200 dark:border-white/10 ${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {row.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.designation}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {row.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex flex-col items-start px-4">
                              <div className="flex justify-between w-full">
                                <span>Ph. No.:</span>
                                <span>{row.phone}</span>
                              </div>
                              <div className="flex justify-between w-full">
                                <span>E-mail:</span>
                                <span>{row.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <input
                              type="checkbox"
                              checked={isChecked[index]}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex w-full justify-between space-x-4">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-lg border border-transparent hover:bg-white hover:border-blue-500 hover:text-blue-500 shadow-md transition-colors duration-300 ease-in-out"
              onClick={() => router.push("/dashboard")}
            >
              Back
            </button>
            <div className="flex items-center">
              <span className="mr-2">Select All</span>
              <input
                type="checkbox"
                checked={isSelectAll}
                onChange={handleSelectAll}
              />
            </div>
            <button
              className="py-2 px-6 bg-red-400 border-2 border-red-600 text-white font-semibold shadow-lg rounded-lg hover:scale-105 hover:border-red-700 hover:bg-white hover:text-red-700 transform transition-transform duration-300 ease-in-out"
              onClick={makeCall}
            >
              ESCALATE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
