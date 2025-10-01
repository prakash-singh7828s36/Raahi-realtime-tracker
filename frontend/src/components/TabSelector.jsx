import React from "react";
import { cn } from "../lib/utils"; 
import { User, Truck, Shield } from "lucide-react";

const TabSelector = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: "commuter", label: "Commuter", icon: User, emoji: "👨‍👩‍👧" },
    { id: "driver", label: "Driver", icon: Truck, emoji: "🚍" },
    { id: "admin", label: "Admin", icon: Shield, emoji: "🛠️" },
  ];

  return (
    <div className="flex bg-secondary/30 rounded-lg p-1 mb-8">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "tab-transport flex-1 rounded-md flex items-center justify-center space-x-2 px-4 py-2 transition-colors cursor-pointer ",
              isActive
                ? "bg-red-500 text-white font-semibold shadow-sm"
                : "hover:bg-gray-600 text-white"
            )}
          >
            <span className="text-lg">{tab.emoji}</span>
            <IconComponent className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TabSelector;
