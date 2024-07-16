import React from "react";

const DataPage = ({ data }) => {
  return (
    <div>
      <h1>Data fetched from flask</h1>
      <div className="grid grid-col-1 md:grid-cols-3 lg:grid-cols-5 gap-7">
          {data?.map((item, index) => (
            <div className="border shadow-md border-t-8 rounded-lg p-5 flex flex-col gap-3">
              {/* <li key={index}> */}
                <ul>
                  <strong>{item.timestamp_ist}</strong>
                  <li>Exit: {item.Exit}</li>
                  <li>Enter: {item.Enter}</li>
                  <li>Total: {item.total}</li>
                </ul>
              {/* </li> */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DataPage;
