import React from "react";
import LiveMap from "../components/LiveMap";

const Driver = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Driver Dashboard</h1>
      <LiveMap driverId="bus-101" />
    </div>
  );
};

export default Driver;
