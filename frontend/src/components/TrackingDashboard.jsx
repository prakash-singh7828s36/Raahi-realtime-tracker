import React from "react";
import { MapPin, Clock, Users, User, Navigation } from "lucide-react";
import LiveMap from "./LiveMap";
import { useNavigate } from "react-router";

// Simple Card component (since you're not using shadcn/ui right now)
const Card = ({ children, className }) => (
  <div className={`bg-white shadow rounded-xl ${className}`}>{children}</div>
);

const CardHeader = ({ children, className }) => (
  <div className={`p-4 border-b ${className}`}>{children}</div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold text-lg ${className}`}>{children}</h3>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ children, className, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md border transition-colors ${className}`}
  >
    {children}
  </button>
);

const TrackingDashboard = () => {
  // Mock data for demonstration
  const buses = [
    {
      id: "BUS-001",
      number: "47A",
      route: "City Center → Airport",
      eta: "5 min",
      occupancy: 75,
      driver: "Rajesh Kumar",
      status: "On Time",
    },
    {
      id: "AUTO-001",
      number: "A-123",
      route: "Station → Mall",
      eta: "2 min",
      occupancy: 50,
      driver: "Suresh Patel",
      status: "Delayed",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
          Live Transport <span className="text-red-700">Dashboard</span>
        </h2>
        <p className=" text-lg text-[#646363] animate-fade-in-up">
          Track all vehicles in real-time with precise location data
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Placeholder */}
        <div className="mapPlaceholder h-33 w-80 bg-[#282828] lg:col-span-2  animate-fade-in-up ">
                {/* <LiveMap driverMode={true} driverId="bus-101" /> */}
          <LiveMap/>
        </div>

        {/* Vehicle Info Cards */}
        <div className="vehicle space-y-6   ">
          {buses.map((vehicle, index) => (
            <Card key={vehicle.id} className="card transport-card animate-fade-in-up">
              <CardHeader className="flex items-center justify-between">
                <CardTitle>{vehicle.number}</CardTitle>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vehicle.status === "On Time"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {vehicle.status}
                </span>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-[#bdbcbc]">
                  <MapPin className="h-4 w-4 mr-2 text-red-700" />
                  {vehicle.route}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-2 text-red-700" />
                    <span className="font-medium">ETA: {vehicle.eta}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-red-700" />
                    <span>{vehicle.occupancy}%</span>
                  </div>
                </div>

                <div className="flex items-center text-sm text-[#bdbcbc]">
                  <User className="h-4 w-4 mr-2 text-red-700" />
                  {vehicle.driver}
                </div>

                <Button className="w-full border text-[#bdbcbc] hover:bg-red-700 hover:text-white cursor-pointer">
                  Track Vehicle
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button onClick={() => navigate("/track")} className="w-full bg-red-500 text-white hover:bg-red-500 flex items-center justify-center transport-card cursor-pointer">
            <MapPin className="mr-2 h-4 w-4" />
            View All Vehicles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TrackingDashboard;
