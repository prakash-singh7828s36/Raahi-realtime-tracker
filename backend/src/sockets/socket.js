
// import { Server } from "socket.io";

// const drivers = {}; // socket.id → driver info

// function setupSocket(server) {
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173", // frontend URL
//       methods: ["GET", "POST"],
//     },
//   });

//   io.on("connection", (socket) => {
//     console.log("✅ New connection:", socket.id);

//     socket.on("send-location", (data) => {
//       if (!data.role) return;

//       if (data.role === "driver") {
//         drivers[socket.id] = { driverId: data.id || socket.id };

//         console.log(
//           `Driver ${drivers[socket.id].driverId} -> Lat: ${data.latitude}, Lng: ${data.longitude}`
//         );

//         io.emit("receive-location", {
//           id: `driver-${drivers[socket.id].driverId}`,
//           latitude: data.latitude,
//           longitude: data.longitude,
//           role: "driver",
//         });
//       }

//       if (data.role === "commuter") {
//         console.log(
//           `Commuter ${data.id || socket.id} -> Lat: ${data.latitude}, Lng: ${data.longitude}`
//         );

//         io.emit("receive-location", {
//           id: `commuter-${data.id || socket.id}`,
//           latitude: data.latitude,
//           longitude: data.longitude,
//           role: "commuter",
//         });
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("❌ Disconnected:", socket.id);

//       if (drivers[socket.id]) {
//         io.emit("driver-disconnected", `driver-${drivers[socket.id].driverId}`);
//         delete drivers[socket.id];
//       } else {
//         io.emit("user-disconnected", `commuter-${socket.id}`);
//       }
//     });
//   });
// }

// export default setupSocket;







// import { useEffect, useRef, useState } from "react";
// import L from "leaflet";
// import { io } from "socket.io-client";
// import "leaflet/dist/leaflet.css";

// const LiveMap = ({ driverId = null }) => {
//   const mapRef = useRef(null);
//   const markersRef = useRef({});
//   const polylineRef = useRef(null);
//   const socketRef = useRef(null);
//   const mapInstanceRef = useRef(null);
//   const [commuterId, setCommuterId] = useState(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     const map = L.map(mapRef.current).setView([23.2599, 77.4126], 12);
//     mapInstanceRef.current = map;

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution: "© OpenStreetMap contributors",
//     }).addTo(map);

//     const socket = io("http://localhost:3000");
//     socketRef.current = socket;

//     const commuterIcon = L.icon({
//       iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//       iconSize: [28, 28],
//     });
//     const driverIcon = L.icon({
//       iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//       iconSize: [32, 32],
//     });

//     // Track own location
//     if (navigator.geolocation) {
//       navigator.geolocation.watchPosition(
//         ({ coords: { latitude, longitude } }) => {
//           const role = driverId ? "driver" : "commuter";

//           const id = driverId ? `driver-${driverId}` : commuterId || "commuter-temp";
//           if (!driverId && !commuterId) setCommuterId(`commuter-temp`);

//           addOrUpdateMarker(id, role, latitude, longitude);

//           socket.emit("send-location", { role, id, latitude, longitude });
//         },
//         (err) => console.error(err),
//         { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
//       );
//     }

//     // Receive locations
//     socket.on("receive-location", ({ id, role, latitude, longitude }) => {
//       if (!id || !latitude || !longitude) return;

//       // Update commuterId if this is the local commuter
//       if (!driverId && role === "commuter" && commuterId === "commuter-temp") {
//         setCommuterId(id);
//       }

//       addOrUpdateMarker(id, role, latitude, longitude);
//       updatePolyline();
//     });

//     // Disconnect events
//     socket.on("driver-disconnected", (id) => {
//       if (markersRef.current[id]) {
//         map.removeLayer(markersRef.current[id]);
//         delete markersRef.current[id];
//       }
//       updatePolyline();
//     });

//     socket.on("user-disconnected", (id) => {
//       if (markersRef.current[id]) {
//         map.removeLayer(markersRef.current[id]);
//         delete markersRef.current[id];
//       }
//       updatePolyline();
//     });

//     function addOrUpdateMarker(id, role, lat, lng) {
//       const icon = role === "driver" ? driverIcon : commuterIcon;
//       const popupText = role === "driver" ? `Driver: ${id.replace("driver-", "")}` : "You";

//       if (!markersRef.current[id]) {
//         markersRef.current[id] = L.marker([lat, lng], { icon })
//           .addTo(map)
//           .bindPopup(popupText);
//       } else {
//         markersRef.current[id].setLatLng([lat, lng]);
//       }

//       if (id === commuterId || (!driverId && id === "commuter-temp")) {
//         markersRef.current[id].openPopup();
//         map.setView([lat, lng], 14);
//       }
//     }

//     function updatePolyline() {
//       if (!commuterId) return;
//       const commuter = markersRef.current[commuterId];
//       const driverKey = Object.keys(markersRef.current).find((k) =>
//         k.startsWith("driver-")
//       );
//       if (!commuter || !driverKey) {
//         if (polylineRef.current) {
//           map.removeLayer(polylineRef.current);
//           polylineRef.current = null;
//         }
//         return;
//       }

//       const driver = markersRef.current[driverKey];
//       const points = [commuter.getLatLng(), driver.getLatLng()];

//       if (!polylineRef.current) {
//         polylineRef.current = L.polyline(points, { color: "blue", weight: 3 }).addTo(map);
//       } else {
//         polylineRef.current.setLatLngs(points);
//       }
//     }

//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [driverId, commuterId]);

//   return <div ref={mapRef} style={{ height: "70vh", width: "100%" }} />;
// };

// export default LiveMap;




import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

const LiveMap = ({ driverId = null }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const polylineRef = useRef(null);
  const socketRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [commuterId, setCommuterId] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current).setView([23.2599, 77.4126], 12);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    const commuterIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
      iconSize: [28, 28],
    });
    const driverIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
      iconSize: [32, 32],
    });

    // Track own location
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        ({ coords: { latitude, longitude } }) => {
          const role = driverId ? "driver" : "commuter";
          const id = driverId ? `driver-${driverId}` : commuterId || "commuter-temp";
          if (!driverId && !commuterId) setCommuterId(`commuter-temp`);

          addOrUpdateMarker(id, role, latitude, longitude);

          socket.emit("send-location", { role, id, latitude, longitude });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
      );
    }

    // Receive locations
    socket.on("receive-location", ({ id, role, latitude, longitude }) => {
      if (!id || !latitude || !longitude) return;

      // Update commuterId if this is local commuter
      if (!driverId && role === "commuter" && commuterId === "commuter-temp") {
        setCommuterId(id);
      }

      addOrUpdateMarker(id, role, latitude, longitude);
      updatePolyline();
    });

    socket.on("driver-disconnected", (id) => {
      if (markersRef.current[id]) {
        map.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
      updatePolyline();
    });

    socket.on("user-disconnected", (id) => {
      if (markersRef.current[id]) {
        map.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
      updatePolyline();
    });

    /** Add or update any marker (commuter or driver) */
    function addOrUpdateMarker(id, role, lat, lng) {
      const icon = role === "driver" ? driverIcon : commuterIcon;
      const popupText = role === "driver" ? `Driver: ${id.replace("driver-", "")}` : "You";

      if (!markersRef.current[id]) {
        markersRef.current[id] = L.marker([lat, lng], { icon })
          .addTo(map)
          .bindPopup(popupText);
      } else {
        markersRef.current[id].setLatLng([lat, lng]);
      }

      // Center map only on local commuter
      if (!driverId && (id === commuterId || id === "commuter-temp")) {
        map.setView([lat, lng], 14);
      }
    }

    /** Draw polyline between commuter & all drivers */
    function updatePolyline() {
      if (!commuterId) return;
      const commuter = markersRef.current[commuterId];
      const driverKeys = Object.keys(markersRef.current).filter((k) =>
        k.startsWith("driver-")
      );
      if (!commuter || driverKeys.length === 0) {
        if (polylineRef.current) {
          map.removeLayer(polylineRef.current);
          polylineRef.current = null;
        }
        return;
      }

      const points = driverKeys.map((k) => markersRef.current[k].getLatLng());
      points.unshift(commuter.getLatLng());

      if (!polylineRef.current) {
        polylineRef.current = L.polyline(points, { color: "blue", weight: 3 }).addTo(map);
      } else {
        polylineRef.current.setLatLngs(points);
      }
    }

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [driverId, commuterId]);

  return <div ref={mapRef} style={{ height: "70vh", width: "100%" }} />;
};

export default LiveMap;
