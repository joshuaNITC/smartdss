import React from "react";
import "./ScrollingAlert.css"; // Create this file for additional styles

const ScrollingAlert = () => {
  return (
    <div className="overflow-hidden border-t-2 border-t-red-500 border-b-2 font-mono border-b-red-500 bg-red-200 text-black py-2 my-3">
      <div className="animate-scroll whitespace-nowrap">
        <span className="mx-20">
          This is an important alert message that scrolls continuously.
        </span>
        <span className="mx-20">
          Please pay attention to this scrolling alert message!
        </span>
      </div>
    </div>
  );
};

export default ScrollingAlert;
