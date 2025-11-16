

import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import { createServer } from "http";
import setupSocket from "./src/sockets/socket.js";

const httpServer = createServer(app);

setupSocket(httpServer);

(async () => {
  try {
    await connectDB();    // <-- NOW returns a promise
    console.log("✅ Database connected");

    const PORT = 3000;
    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.log("❌ Database connection failed:", err);
  }
})();
