import React from "react";
import { MapPin, Clock, Users } from "lucide-react";
import heroImage from "../assets/hero-transport.jpg";
import { useNavigate } from "react-router-dom";
import ChatWidget from "./ChatWidget";


const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
         </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40 "></div>

      {/* Animated Route Lines */}
      <div className="absolute inset-0">
        <div className="route-lines absolute top-1/4 left-0 w-full h-0.5 opacity-60 " />
        <div
          className="route-lines absolute top-2/3 left-0 w-full h-0.5 opacity-40 "
          style={{ animationDelay: "1s" }}
        />
        <div
          className="route-lines absolute top-1/2 left-0 w-full h-0.5 opacity-30"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            Smart Travel for
            <span className="block text-red-700 animate-pulse-glow">
              Small Cities
            </span>
          </h1>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-xl md:text-2xl text-[#9d9a9a] mb-8 max-w-2xl mx-auto">
            Real-time tracking, smart bookings, and seamless travel experience
            for your local public transport.
          </p>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          {/* If you don’t have Button, replace with <button> */}
          <button  onClick={() => navigate("/track")}   className="bg-red-700  hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl glow-red-hover hover:animate-scale-glow transition-all duration-300 transform hover:scale-105  cursor-pointer">
            <MapPin className="mr-2 h-5 w-5 inline-block" />
            Track Now
          </button>
        </div>

        {/* Feature Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-fade-in-up"
          style={{ animationDelay: "0.8s" }}
        >
          <div 
          className="transport-card p-6 rounded-xl hero-float">
            <MapPin className="h-8 w-8 text-red-500 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Live Tracking
            </h3>
            <p className="text-muted-foreground">
              Real-time location of buses and autos
            </p>
          </div>

          <div
            className="transport-card p-6 rounded-xl hero-float"
            style={{ animationDelay: "0.5s" }}
          >
            <Clock className="h-8 w-8 text-red-500  mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Smart ETA
            </h3>
            <p className="text-muted-foreground">
              Accurate arrival time predictions
            </p>
          </div>

          <div
            className="transport-card p-6 rounded-xl hero-float"
            style={{ animationDelay: "1s" }}
          >
            <Users className="h-8 w-8 text-red-500  mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Easy Booking
            </h3>
            <p className="text-muted-foreground">
              Quick seat selection and payment
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-red-700 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <div className="h-20 w-3 "> <ChatWidget /></div>
    </section>
  );
};

export default HeroSection;
