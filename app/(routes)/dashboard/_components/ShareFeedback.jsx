import React from "react";

const ShareFeedback = () => {
  return (
    <div
      className="w-[90%] md:w-[70%] h-[300px] bg-[#FFFFFF] rounded-2xl flex flex-col justify-center space-y-4 px-5 md:px-10"
      style={{ boxShadow: "10px 10px 25px 0px #00000026" }}
    >
      <h1 className="flex justify-center font-bold text-lg">Share Your Feedback:</h1>
      <input className="bg-gray-200 w-full h-10 rounded-xl shadow-md opacity-60 px-5 py-2 text-gray-800 placeholder-gray-600 text-sm" placeholder="Enter your e-mail*" />
      <input className="bg-gray-200 w-full h-20 rounded-xl shadow-md opacity-60 px-5 py-2 text-gray-800 placeholder-gray-600 text-sm" placeholder="Email us your feedback*" />
    </div>
  );
};

export default ShareFeedback;
