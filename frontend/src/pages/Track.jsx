import Navigation from '../components/Navigation';
import { MapPin, Clock, Users, Navigation as NavigationIcon, Search } from 'lucide-react';
import LiveMap from "../components/LiveMap";

const Track = () => {
  const vehicles = [
    { number: 'B-101', route: 'City Center - Mall', eta: '5 min', occupancy: '75%' },
    { number: 'A-205', route: 'Station - Hospital', eta: '12 min', occupancy: '45%' },
    { number: 'B-302', route: 'Market - University', eta: '8 min', occupancy: '90%' }
  ];

  return (
    <div className="min-h-screen bg-[#121212]">
      <Navigation />
      <main className="pt-8 pb-16 px-4 max-w-7xl mx-auto animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-300 to-red-800 bg-clip-text text-transparent">
            Track Your Ride
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Real-time tracking for buses and auto-rickshaws in your city
          </p>
        </div>

        {/* Search Section */}
        <div className="transport-card bg-[#282828] border rounded-lg shadow p-6 mb-8   ">
          <h1 className='text-2xl flex items-center gap-1 font-bold'>  <Search className="h-6 w-6 font-bold text-red-700" /> Find Your Vehicle</h1>
          <div className="flex flex-col md:flex-row justify-between items-center w-full p-3 bg-[#282828]">
            <input
              type="text"
              placeholder="Route Name (e.g., City Center)"
              className="border  px-3 py-2 rounded w-full md:w-1/3 ]"
            />
            <button className="bg-red-600 text-white px-[70px] py-2 rounded flex items-center gap-2 hover:bg-red-700 cursor-pointer">
              <MapPin className="h-4 w-4" /> Track Now
            </button>
          </div>
        </div>

        {/* Map Section */}
       {/* Map Section */}
<div className="transport-card bg-gray-500 border rounded-lg shadow mb-8 overflow-hidden" style={{ height: '300px', width: '100%' }}>
  <LiveMap />
</div>


        {/* Vehicle Status Cards */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Active Vehicles</h2>
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map(vehicle => (
              <div key={vehicle.number} className="transport-card bg-[#2A2A2A] border rounded-lg shadow p-4 flex flex-col justify-between">
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-red-700 font-semibold">{vehicle.number}</span>
                  <span className="text-xs bg-red-500 text-gray-300 px-2 py-1 rounded">Live</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {vehicle.route}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    ETA: {vehicle.eta}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    Occupancy: {vehicle.occupancy}
                  </div>
                </div>
                <button className="border px-3 py-2 text-sm rounded hover:bg-red-700 w-full cursor-pointer">View Details</button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Track;
