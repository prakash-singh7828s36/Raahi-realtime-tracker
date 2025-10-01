import React from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import TrackingDashboard from "../components/TrackingDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Navigation />
      <main>
        <HeroSection />
        <TrackingDashboard />
      </main>
    </div>
  );
};

export default Index;