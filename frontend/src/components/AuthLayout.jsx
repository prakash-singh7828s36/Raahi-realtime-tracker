import { Bus, Navigation } from "lucide-react";
import Navigations from '../components/Navigation';
import transportBg from "../assets/transport-bg.jpg"; // ✅ use ./ instead of @/assets


const AuthLayout = ({ children, title }) => {
  return (
    <div
      className="min-h-screen bg-background transport-bg-pattern relative overflow-hidden"
      style={{
        backgroundImage: `url(${transportBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>

      {/* Navigation Bar */}
      <nav className="relative z-40 w-full">
       <Navigations />
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {title}
            </h2>
            <p className="text-muted-foreground">
              Access your transport tracking dashboard
            </p>
          </div>

          <div className="card-transport p-8">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
