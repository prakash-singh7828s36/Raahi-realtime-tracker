import React from "react";
import Navigation from "../components/Navigation";
import { Ticket, CreditCard, QrCode, MapPin, Clock, Users } from "lucide-react";
import axios from "axios";


const Book = () => {
    const seatLayout = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        status:
            Math.random() > 0.7
                ? "booked"
                : Math.random() > 0.8
                    ? "selected"
                    : "available",
    }));

    const getSeatColor = (status) => {
        switch (status) {
            case "available":
                return "bg-white border border-gray-300 hover:border-blue-500 cursor-pointer";
            case "booked":
                return "bg-red-500 border-red-500 cursor-not-allowed";
            case "selected":
                return "bg-blue-500 border-blue-500 cursor-pointer";
            default:
                return "bg-white border border-gray-300";
        }
    };

    const handleBuyNow = async () => {
    try {
      const response = await axios.post("http://localhost:3000/create/orderId");
        //  const {amount, id:order_id, currency}= response.data;
         console.log(response.data);
         

    } catch (error) {
      console.error("Error creating order:", error);
      alert("Payment initiation failed. Try again.");
    }
  };


    return (
        <div className="min-h-screen bg-[#121212] ">
            <Navigation />

            <main className="pt-8 pb-16 animate-fade-in-up ">
                {/* Header Section */}
                <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-300 to-red-800 bg-clip-text text-transparent">
                        Book Your Ticket
                    </h1>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        Reserve your seat and travel with confidence
                    </p>
                </section>

                <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 ">
                    {/* Route Selection */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Select Route Card */}
                        <div className="transport-card bg-[#282828] shadow-md rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <MapPin className="h-5 w-5 text-red-500" />
                                <h2 className="text-lg font-semibold">Select Route</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <input
                                    placeholder="From (e.g., City Center)"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                                <input
                                    placeholder="To (e.g., Mall)"
                                    className="p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 w-full transition-transform transform hover:scale-105">
                                Find Routes
                            </button>
                        </div>

                        {/* Available Routes */}
                        <div className="transport-card bg-[#282828] shadow-md rounded-lg p-6 space-y-4">
                            <h2 className="text-lg font-semibold mb-2">Available Routes</h2>
                            {[
                                {
                                    number: "B-101",
                                    route: "City Center → Mall",
                                    time: "2:30 PM",
                                    fare: "₹25",
                                    duration: "45 min",
                                },
                                {
                                    number: "B-205",
                                    route: "City Center → Mall",
                                    time: "3:15 PM",
                                    fare: "₹25",
                                    duration: "40 min",
                                },
                                {
                                    number: "A-302",
                                    route: "City Center → Mall",
                                    time: "4:00 PM",
                                    fare: "₹35",
                                    duration: "35 min",
                                },
                            ].map((route) => (
                                <div
                                    key={route.number}
                                    className="p-4 border border-gray-300 rounded-lg hover:border-red-500 transition-colors cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                                    {route.number}
                                                </span>
                                                <span className="text-sm text-gray-600">{route.route}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {route.time}
                                                </span>
                                                <span>{route.duration}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-semibold text-red-500">
                                                {route.fare}
                                            </div>
                                            <button className="mt-1 px-2 py-1 border border-gray-300 rounded hover:bg-red-500 text-sm transition-transform transform hover:scale-105 cursor-pointer">
                                                Select
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Seat Selection */}
                        <div className="transport-card bg-[#282828] shadow-md rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="h-5 w-5 text-red-500" />
                                <h2 className="text-lg font-semibold">Select Seats</h2>
                            </div>

                            <div className="mb-4 flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
                                    <span>Available</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                                    <span>Booked</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                                    <span>Selected</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-10 gap-2 max-w-md mx-auto">
                                {seatLayout.map((seat) => (
                                    <div
                                        key={seat.id}
                                        className={`w-8 h-8 border-2 rounded text-xs flex items-center justify-center transition-all ${getSeatColor(
                                            seat.status
                                        )}`}
                                    >
                                        {seat.id}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="space-y-6">
                        <div className="transport-card bg-[#282828] shadow-md rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Ticket className="h-5 w-5 text-red-500" />
                                <h2 className="text-lg font-semibold">Booking Summary</h2>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Route</span>
                                    <span>B-101</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Seats</span>
                                    <span>12, 13</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Fare</span>
                                    <span>₹50</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Tax</span>
                                    <span>₹5</span>
                                </div>
                                <div className="border-t border-gray-300 pt-2">
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span className="text-red-500">₹55</span>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleBuyNow}  className="w-full mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2 transition-transform transform hover:scale-105 cursor-pointer">
                                <CreditCard className="h-4 w-4" /> Proceed to Pay
                            </button>
                        </div>

                        {/* QR Code Preview */}
                        <div className="transport-card bg-[#282828] shadow-md rounded-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <QrCode className="h-5 w-5 text-red-500" />
                                <h2 className="text-lg font-semibold">Digital Ticket</h2>
                            </div>
                            <div className="aspect-square bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                <div className="text-center">
                                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                                    <p className="text-sm text-gray-400">
                                        QR code will be generated after payment
                                    </p>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Book;