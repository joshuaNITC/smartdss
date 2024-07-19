import React from "react";

const Role = ({ stage }) => {
  let alertMessage = "No Alerts At The Moment";
  let backgroundColor = "#FF00001A";
  let borderColor = "#FF000080";
  let textColor = "#000000";
  
  switch (stage) {
    case 1:
      alertMessage = "Stage 1 Alert";
      backgroundColor = "#a0c5e7"; // Blue
      borderColor = "#00FF0080";
      textColor = "#000000";
      break;
    case 2:
      alertMessage = "Stage 2 Alert";
      backgroundColor = "#eedbe3"; // Orange
      borderColor = "#FFA50080";
      textColor = "#000000";
      break;
    case 3:
      alertMessage = "Stage 3 Alert";
      backgroundColor = "#985674"; // Red
      borderColor = "#FF000080";
      textColor = "#FFFFFF";
      break;
    default:
      // Stage 0 or any other stage not explicitly defined
      break;
  }

  return (
    <div
      className="flex flex-col w-[90%] mx-auto justify-center shadow-lg h-auto rounded-xl"
      style={{ backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: "1px", borderStyle: "solid" }}
    >
      <div className="flex flex-row w-full justify-between px-4 py-4" style={{ color: textColor }}>
        This section is to decide what's the role the person has to play in this situation in stage {stage}
      </div>
      <div className="flex flex-row w-full justify-between px-4 py-4" style={{ color: textColor }}>
        {alertMessage}
      </div>
    </div>
  );
};

export default Role;
