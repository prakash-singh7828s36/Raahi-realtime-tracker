import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bus, Menu, X, Bell, MapPin, Ticket,LogIn } from "lucide-react";


const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Bus },
    { name: "Track", path: "/track", icon: MapPin },
    { name: "Book Tickets", path: "/book", icon: Ticket },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Login", path: "/login", icon: LogIn },
    
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-card border-border sticky top-0 z-50 bg-[#252525] backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-red-700 rounded-lg group-hover:animate-pulse-glow transition-all duration-300">
              <Bus className="h-6 w-6 text-white-900" />
            </div>
            <div className="text-xl font-bold text-foreground">
              RAA<span className="text-red-700 font-extrabold text-2xl">HI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4 text-[#959292]">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center space-x-1 ${
                      isActive(item.path)
                        ? "bg-red-700 text-white glow-red"
                        : "text-muted-foreground hover:text-white hover:bg-[#5a5a5a]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-all duration-300 flex items-center space-x-2 ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
