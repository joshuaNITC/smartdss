import { app } from "@/config/FirebaseConfig";
import { get, getDatabase, ref } from "firebase/database";
import React, { useEffect, useState } from "react";

const AlertBox = ({stage}) => {
  // // const stage = 2; // Change this value to test different stages
  // const [stage, setStage] = useState(3);
  // const db = getDatabase(app);

  // const getStage = () => {
  //   const dbRef = ref(db, "/stage");
  //   get(dbRef).then((snapshot) => {
  //     if (snapshot.exists()) {
  //       var value = snapshot.val();
  //       setStage(value);
  //     } else {
  //       console.log("No data available");
  //     }
  //   });
  // };
  
  // useEffect(() => {
  //   getStage();
  // }, []);

  let alertMessage = "No Alerts At The Moment";
  let backgroundColor = "#FF00001A";
  let borderColor = "#FF000080";
  let textColor = "#000000";

  switch (stage) {
    case 1:
      alertMessage = "Stage 1 Alert";
      backgroundColor = "#e0eedd"; // Green
      borderColor = "#00FF0080";
      textColor = "#000000";
      break;
    case 2:
      alertMessage = "Stage 2 Alert";
      backgroundColor = "#f6b46b"; // Orange
      borderColor = "#FFA50080";
      textColor = "#000000";
      break;
    case 3:
      alertMessage = "Stage 3 Alert";
      backgroundColor = "#e06668"; // Red
      borderColor = "#FF000080";
      textColor = "#FFFFFF";
      break;
    default:
      // Stage 0 or any other stage not explicitly defined
      break;
  }

  return (
    <div
      className="flex justify-center h-[200px] w-[90%] md:w-full rounded-3xl animate-fadeInUp"
      style={{
        backgroundColor: backgroundColor,
        border: `2px solid ${borderColor}`,
      }}
    >
      <div className="flex flex-col justify-center font-bold text-md md:text-2xl" style={{ color: textColor }}>
        {alertMessage}
      </div>
    </div>
  );
};

export default AlertBox;
