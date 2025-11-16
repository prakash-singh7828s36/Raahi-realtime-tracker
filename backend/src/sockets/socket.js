import { Server } from "socket.io";

export default function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("🔗 User connected:", socket.id);

    // Handle live location from driver / commuter
    socket.on("send-location", (data) => {
      if (!data?.id || !data?.latitude || !data?.longitude) {
        console.log("⚠️ Invalid location data received");
        return;
      }

      console.log(`📍 Location from ${data.id} =>`, data);

      // Broadcast to all clients except sender
      socket.broadcast.emit("receive-location", {
        id: data.id,
        role: data.role,
        latitude: data.latitude,
        longitude: data.longitude,
      });

      // Store user in socket memory for disconnection tracking
      socket.data.userId = data.id;
      socket.data.role = data.role;
    });

    // On disconnect
    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.data.userId);

      if (socket.data.role === "driver") {
        io.emit("driver-disconnected", socket.data.userId);
      } else {
        io.emit("user-disconnected", socket.data.userId);
      }
    });
  });

  return io;
}
