import React from "react";
import { AiOutlineWarning, AiOutlineInfoCircle, AiOutlineCheckCircle } from "react-icons/ai";

const Role = ({ stage }) => {
  let alertMessage = "No Alerts At The Moment";
  let backgroundColor = "#FF00001A";
  let borderColor = "#FF000080";
  let textColor = "#000000";
  let icon = <AiOutlineInfoCircle size={30} />;

  switch (stage) {
    case 1:
      alertMessage = "Stage 1 Alert: Be Aware";
      backgroundColor = "#a0c5e7"; // Blue
      borderColor = "#00FF0080";
      textColor = "#000000";
      icon = <AiOutlineCheckCircle size={30} />;
      break;
    case 2:
      alertMessage = "Stage 2 Alert: Take Precaution";
      backgroundColor = "#eedbe3"; // Orange
      borderColor = "#000000";
      textColor = "#000000";
      icon = <AiOutlineWarning size={30} />;
      break;
    case 3:
      alertMessage = "Stage 3 Alert: Immediate Action Required";
      backgroundColor = "#985674"; // Red
      borderColor = "#FF000080";
      textColor = "#FFFFFF";
      icon = <AiOutlineWarning size={30} />;
      break;
    default:
      // Stage 0 or any other stage not explicitly defined
      break;
  }

  return (
    <div
      className="flex flex-col w-[90%] mx-auto justify-center shadow-lg h-auto rounded-xl border"
      style={{ backgroundColor: backgroundColor, borderColor: borderColor }}
    >
      <div className="flex items-center px-4 py-4 space-x-4" style={{ color: textColor }}>
        {icon}
        <div className="flex flex-col">
          <div className="text-xl font-bold">Alert Stage {stage}</div>
          <div className="text-md">{alertMessage}</div>
        </div>
      </div>
      <div className="px-4 py-2" style={{ color: textColor }}>
        <p className="text-base">
          This section defines the role and actions required for the individual during stage {stage}. Please follow the instructions carefully to ensure safety and compliance.
        </p>
      </div>
    </div>
  );
};

export default Role;
