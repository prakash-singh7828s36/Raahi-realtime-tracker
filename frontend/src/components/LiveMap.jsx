// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import { io } from "socket.io-client";
// import "leaflet/dist/leaflet.css";

// const LiveMap = ({ driverId = null }) => {
//   const mapRef = useRef(null);
//   const commuterMarkerRef = useRef(null);
//   const driverMarkersRef = useRef({});
//   const socketRef = useRef(null);
//   const mapInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     // Use requestAnimationFrame to wait until the div is ready
//     requestAnimationFrame(() => {
//       if (mapInstanceRef.current) return; // prevent multiple maps

//       const map = L.map(mapRef.current).setView([0, 0], 12);
//       mapInstanceRef.current = map;

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(map);

//       // Socket.IO
//       const socket = io("http://localhost:3000");
//       socketRef.current = socket;

//       // Icons
//       const commuterIcon = L.icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//         iconSize: [28, 28],
//       });
//       const driverIcon = L.icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//         iconSize: [32, 32],
//       });

//       // Track own location
//       if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(
//           ({ coords: { latitude, longitude } }) => {
//             const id = driverId ? `driver-${driverId}` : `commuter`;

//             // Commuter marker
//             if (!driverId) {
//               if (!commuterMarkerRef.current) {
//                 commuterMarkerRef.current = L.marker([latitude, longitude], {
//                   icon: commuterIcon,
//                 })
//                   .addTo(map)
//                   .bindPopup("You (Commuter)");
//                 map.setView([latitude, longitude], 14);
//               } else {
//                 commuterMarkerRef.current.setLatLng([latitude, longitude]);
//               }
//             }

//             // Emit location
//             socket.emit("send-location", {
//               role: driverId ? "driver" : "commuter",
//               id,
//               latitude,
//               longitude,
//             });
//           },
//           (err) => console.error(err),
//           { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//         );
//       }

//       // Receive driver locations
//       socket.on("receive-location", ({ id, latitude, longitude }) => {
//         if (!id) return;

//         // Never overwrite commuter marker
//         if (id === "commuter") return;

//         if (!driverMarkersRef.current[id]) {
//           driverMarkersRef.current[id] = L.marker([latitude, longitude], {
//             icon: driverIcon,
//           })
//             .addTo(map)
//             .bindPopup(`Driver: ${id}`);
//           console.log("Driver marker added:", id);
//         } else {
//           driverMarkersRef.current[id].setLatLng([latitude, longitude]);
//         }
//       });

//       // Remove driver on disconnect
//       socket.on("driver-disconnected", (id) => {
//         if (driverMarkersRef.current[id]) {
//           map.removeLayer(driverMarkersRef.current[id]);
//           delete driverMarkersRef.current[id];
//           console.log("Driver disconnected:", id);
//         }
//       });
//     });

//     // Cleanup
//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [driverId]);

//   return <div ref={mapRef} style={{ height: "70vh", width: "100%" }} />;
// };

// export default LiveMap;




// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import { io } from "socket.io-client";
// import "leaflet/dist/leaflet.css";

// const LiveMap = ({ driverId = null }) => {
//   const mapRef = useRef(null);
//   const markersRef = useRef({}); // { id: L.Marker }
//   const polylineRef = useRef(null);
//   const socketRef = useRef(null);
//   const mapInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     requestAnimationFrame(() => {
//       if (mapInstanceRef.current) return; // prevent multiple maps

//       // Initialize map
//       const map = L.map(mapRef.current).setView([23.2599, 77.4126], 12);
//       mapInstanceRef.current = map;

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(map);

//       // Socket
//       const socket = io("http://localhost:3000");
//       socketRef.current = socket;

//       // Icons
//       const commuterIcon = L.icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//         iconSize: [28, 28],
//       });
//       const driverIcon = L.icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//         iconSize: [32, 32],
//       });

//       // Track own location
//       if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(
//           ({ coords: { latitude, longitude } }) => {
//             const role = driverId ? "driver" : "commuter";
//             const id = driverId ? `driver-${driverId}` : "commuter";

//             // Create/update own marker
//             if (!markersRef.current[id]) {
//               markersRef.current[id] = L.marker([latitude, longitude], {
//                 icon: role === "driver" ? driverIcon : commuterIcon,
//               })
//                 .addTo(map)
//                 .bindPopup(role === "driver" ? `Driver: ${driverId}` : "You (Commuter)");
//               map.setView([latitude, longitude], 14);
//             } else {
//               markersRef.current[id].setLatLng([latitude, longitude]);
//             }

//             // Emit location
//             socket.emit("send-location", { role, id, latitude, longitude });
//           },
//           (err) => console.error(err),
//           { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//         );
//       }

//       // Receive locations (driver + commuter)
//       socket.on("receive-location", ({ id, role, latitude, longitude }) => {
//         if (!id) return;
//         const icon = role === "driver" ? driverIcon : commuterIcon;

//         if (!markersRef.current[id]) {
//           markersRef.current[id] = L.marker([latitude, longitude], { icon })
//             .addTo(map)
//             .bindPopup(`${role.toUpperCase()}: ${id}`);
//           console.log(`${role} marker added:`, id);
//         } else {
//           markersRef.current[id].setLatLng([latitude, longitude]);
//         }

//         // Draw polyline between first driver and commuter (if both exist)
//         updatePolyline(map);
//       });

//       // Handle driver disconnect
//       socket.on("driver-disconnected", (id) => {
//         if (markersRef.current[id]) {
//           map.removeLayer(markersRef.current[id]);
//           delete markersRef.current[id];
//           console.log("Driver disconnected:", id);
//         }
//         updatePolyline(map);
//       });

//       // Function to update polyline between one commuter & one driver
//       function updatePolyline(map) {
//         const commuter = markersRef.current["commuter"];
//         const driverKey = Object.keys(markersRef.current).find((k) => k.startsWith("driver-"));
//         if (!commuter || !driverKey) {
//           if (polylineRef.current) {
//             map.removeLayer(polylineRef.current);
//             polylineRef.current = null;
//           }
//           return;
//         }
//         const driver = markersRef.current[driverKey];
//         const points = [commuter.getLatLng(), driver.getLatLng()];

//         if (!polylineRef.current) {
//           polylineRef.current = L.polyline(points, { color: "blue", weight: 3 }).addTo(map);
//         } else {
//           polylineRef.current.setLatLngs(points);
//         }
//       }
//     });

//     // Cleanup
//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [driverId]);

//   return <div ref={mapRef} style={{ height: "70vh", width: "100%" }} />;
// };

// export default LiveMap;








// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import { io } from "socket.io-client";
// import "leaflet/dist/leaflet.css";

// const LiveMap = ({ driverId = null }) => {
//   const mapRef = useRef(null);
//   const markersRef = useRef({}); // { id: L.Marker }
//   const polylineRef = useRef(null);
//   const socketRef = useRef(null);
//   const mapInstanceRef = useRef(null);

//   useEffect(() => {
//     if (!mapRef.current) return;

//     requestAnimationFrame(() => {
//       if (mapInstanceRef.current) return; // prevent multiple maps

//       // Initialize map (fallback Bhopal center)
//       const map = L.map(mapRef.current).setView([23.2599, 77.4126], 12);
//       mapInstanceRef.current = map;

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "© OpenStreetMap contributors",
//       }).addTo(map);

//       // Socket
//       const socket = io("http://localhost:3000");
//       socketRef.current = socket;

//       // Icons
//       const commuterIcon = L.icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
//         iconSize: [28, 28],
//       });
//       const driverIcon = L.icon({
//         iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
//         iconSize: [32, 32],
//       });

//       // Track own location
//       if (navigator.geolocation) {
//         navigator.geolocation.watchPosition(
//           ({ coords: { latitude, longitude } }) => {
//             const role = driverId ? "driver" : "commuter";
//             const id = driverId ? `driver-${driverId}` : "commuter";

//             addOrUpdateMarker(map, id, role, latitude, longitude, {
//               commuterIcon,
//               driverIcon,
//             });

//             // Emit location to server
//             socket.emit("send-location", { role, id, latitude, longitude });
//           },
//           (err) => {
//             console.error("Geolocation error:", err);

//             // fallback location (Bhopal)
//             const fallbackLat = 23.2599;
//             const fallbackLng = 77.4126;
//             const fallbackId = driverId ? `driver-${driverId}` : "commuter";
//             const role = driverId ? "driver" : "commuter";

//             addOrUpdateMarker(map, fallbackId, role, fallbackLat, fallbackLng, {
//               commuterIcon,
//               driverIcon,
//             });
//           },
//           { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
//         );
//       }

//       // Receive locations (driver + commuter)
//       socket.on("receive-location", ({ id, role, latitude, longitude }) => {
//         if (!id || !latitude || !longitude) return;

//         addOrUpdateMarker(map, id, role, latitude, longitude, {
//           commuterIcon,
//           driverIcon,
//         });

//         // Update polyline
//         updatePolyline(map);
//       });

//       // Handle driver disconnect
//       socket.on("driver-disconnected", (id) => {
//         if (markersRef.current[id]) {
//           map.removeLayer(markersRef.current[id]);
//           delete markersRef.current[id];
//         }
//         updatePolyline(map);
//       });

//       // Handle commuter disconnect
//       socket.on("user-disconnected", (id) => {
//         if (markersRef.current[id]) {
//           map.removeLayer(markersRef.current[id]);
//           delete markersRef.current[id];
//         }
//         updatePolyline(map);
//       });

//       /** Helper: Add or Update marker */
//       function addOrUpdateMarker(map, id, role, latitude, longitude, icons) {
//         const icon = role === "driver" ? icons.driverIcon : icons.commuterIcon;

//         if (!markersRef.current[id]) {
//           markersRef.current[id] = L.marker([latitude, longitude], { icon })
//             .addTo(map)
//             .bindPopup(`${role.toUpperCase()}: ${id}`);
//           if (id === "commuter") {
//             map.setView([latitude, longitude], 14);
//           }
//         } else {
//           markersRef.current[id].setLatLng([latitude, longitude]);
//         }
//       }

//       /** Helper: Update polyline between commuter & first driver */
//       function updatePolyline(map) {
//         const commuter = markersRef.current["commuter"];
//         const driverKey = Object.keys(markersRef.current).find((k) =>
//           k.startsWith("driver-")
//         );

//         if (!commuter || !driverKey) {
//           if (polylineRef.current) {
//             map.removeLayer(polylineRef.current);
//             polylineRef.current = null;
//           }
//           return;
//         }

//         const driver = markersRef.current[driverKey];
//         const points = [commuter.getLatLng(), driver.getLatLng()];

//         if (!polylineRef.current) {
//           polylineRef.current = L.polyline(points, {
//             color: "blue",
//             weight: 3,
//           }).addTo(map);
//         } else {
//           polylineRef.current.setLatLngs(points);
//         }
//       }
//     });

//     // Cleanup
//     return () => {
//       if (socketRef.current) socketRef.current.disconnect();
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [driverId]);

//   return <div ref={mapRef} style={{ height: "70vh", width: "100%" }} />;
// };

// export default LiveMap;





import { useEffect, useRef } from "react";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

const LiveMap = ({ driverId = null }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({}); // { id: L.Marker }
  const polylineRef = useRef(null);
  const socketRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    requestAnimationFrame(() => {
      if (mapInstanceRef.current) return;

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

      /** Add or Update marker with proper popup */
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

        // Open popup only for commuter-local
        if (id === "commuter-local") {
          markersRef.current[id].openPopup();
          map.setView([lat, lng], 14);
        }
      }

      /** Update polyline between commuter & first driver */
      function updatePolyline() {
        const commuter = markersRef.current["commuter-local"];
        const driverKey = Object.keys(markersRef.current).find((k) =>
          k.startsWith("driver-")
        );

        if (!commuter || !driverKey) {
          if (polylineRef.current) {
            map.removeLayer(polylineRef.current);
            polylineRef.current = null;
          }
          return;
        }

        const driver = markersRef.current[driverKey];
        const points = [commuter.getLatLng(), driver.getLatLng()];

        if (!polylineRef.current) {
          polylineRef.current = L.polyline(points, { color: "blue", weight: 3 }).addTo(map);
        } else {
          polylineRef.current.setLatLngs(points);
        }
      }

      // Track own location
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          ({ coords: { latitude, longitude } }) => {
            const role = driverId ? "driver" : "commuter";
            const id = driverId ? `driver-${driverId}` : "commuter-local";

            addOrUpdateMarker(id, role, latitude, longitude);
            updatePolyline();

            socket.emit("send-location", { role, id, latitude, longitude });
          },
          (err) => console.error("Geolocation error:", err),
          { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
        );
      }

      // Receive location updates
      socket.on("receive-location", ({ id, role, latitude, longitude }) => {
        if (!id || !latitude || !longitude) return;

        addOrUpdateMarker(id, role, latitude, longitude);
        updatePolyline();
      });

      // Handle disconnects
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
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [driverId]);

  return <div ref={mapRef} style={{ height: "70vh", width: "100%" }} />;
};

export default LiveMap;
