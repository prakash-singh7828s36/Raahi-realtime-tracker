import React from "react";
import LiveMap from "./LiveMap";

const Dashboard = () => {
  return (
    <div
      style={{
        width: "600px",  
        height: "400px", 
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden"
      }}
    >
      <LiveMap />
    </div>
  );
};

export default Dashboard;
