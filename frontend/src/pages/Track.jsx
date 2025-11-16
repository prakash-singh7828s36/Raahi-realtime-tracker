
import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { MapPin, Clock, Users, Search } from "lucide-react";
import LiveMap from "../components/LiveMap";
import { io } from "socket.io-client";

const Track = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("receive-location", ({ id, role, latitude, longitude }) => {
      if (!id.startsWith("driver-")) return;

      setDrivers((prev) => {
        const exists = prev.find((d) => d.id === id);

        if (exists) {
          return prev.map((d) =>
            d.id === id ? { ...d, lat: latitude, lng: longitude } : d
          );
        }

        return [...prev, { id, lat: latitude, lng: longitude }];
      });
    });

    return () => socket.disconnect();
  }, []);

  // Filter drivers by search box
  const filteredDrivers = drivers.filter((d) =>
    d.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navigation />

      <main className="pt-8 pb-16 px-4 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-red-300 to-red-800 bg-clip-text text-transparent">
            Track Your Ride
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            Real-time tracking for buses and auto-rickshaws in your city
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-[#282828] border rounded-lg shadow p-6 mb-8">
          <h1 className="text-2xl flex items-center gap-2 font-bold">
            <Search className="h-6 w-6 text-red-700" /> Find Your Vehicle
          </h1>

          <div className="flex flex-col md:flex-row gap-3 w-full mt-4">
            <input
              type="text"
              placeholder="Search Driver ID (e.g., driver-101)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-3 py-2 rounded w-full bg-[#1b1b1b] text-white"
            />

            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              <MapPin className="inline-block mr-2 h-4 w-4" />
              Track Now
            </button>
          </div>
        </div>

        {/* Map Section */}
        <div
          className="bg-[#222] border rounded-lg shadow mb-10 overflow-hidden"
          style={{ height: "300px", width: "100%" }}
        >
          <LiveMap driverId={selectedDriver} />
        </div>

        {/* Live Driver List */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Active Vehicles</h2>

          {filteredDrivers.length === 0 ? (
            <p className="text-gray-400">No live vehicles found...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDrivers.map(({ id }) => (
                <div
                  key={id}
                  className="bg-[#2A2A2A] border rounded-lg shadow p-4 flex flex-col justify-between"
                >
                  <div className="mb-4 flex justify-between items-center">
                    <span className="text-red-500 font-semibold text-lg">
                      {id}
                    </span>
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                      Live
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      Tracking Enabled
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      Real-time Updates
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500" />
                      Public Vehicle
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedDriver(id)}
                    className="border px-3 py-2 text-sm rounded hover:bg-red-700 w-full cursor-pointer"
                  >
                    Track Vehicle
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Track;
