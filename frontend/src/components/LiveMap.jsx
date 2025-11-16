import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

const LiveMap = ({ driverId = null }) => {
  const mapRef = useRef(null);
  const socketRef = useRef(null);
  const markersRef = useRef({});

  const [commuterPos, setCommuterPos] = useState(null);
  const [driverPos, setDriverPos] = useState(null);
  const [distance, setDistance] = useState(null);

  // Simple distance calculation (free)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
  };

  useEffect(() => {
    if (!mapRef.current) return;

    // Create map
    const map = L.map(mapRef.current).setView([23.2599, 77.4126], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    // Icons
    const commuterIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
      iconSize: [32, 32],
    });

    const driverIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/61/61231.png",
      iconSize: [36, 36],
    });

    // Socket
    const socket = io("http://localhost:3000");
    socketRef.current = socket;

    // Create OR Update marker
    const updateMarker = (id, lat, lng, role) => {
      const icon = role === "driver" ? driverIcon : commuterIcon;

      if (!markersRef.current[id]) {
        markersRef.current[id] = L.marker([lat, lng], { icon }).addTo(map);
      } else {
        markersRef.current[id].setLatLng([lat, lng]);
      }
    };

    // Watch user location (driver or commuter)
    navigator.geolocation.watchPosition(
      ({ coords }) => {
        const lat = coords.latitude;
        const lng = coords.longitude;

        const id = driverId ? `driver-${driverId}` : "commuter";
        const role = driverId ? "driver" : "commuter";

        if (!driverId) setCommuterPos({ lat, lng });
        if (driverId) setDriverPos({ lat, lng });

        updateMarker(id, lat, lng, role);

        socket.emit("send-location", {
          id,
          role,
          latitude: lat,
          longitude: lng,
        });
      },
      (err) => console.log(err),
      { enableHighAccuracy: true }
    );

    // Receive other users
    socket.on("receive-location", ({ id, role, latitude, longitude }) => {
      updateMarker(id, latitude, longitude, role);

      if (id.startsWith("driver")) {
        setDriverPos({ lat: latitude, lng: longitude });
      }
    });

    return () => {
      socket.disconnect();
      map.remove();
    };
  }, [driverId]);

  // Distance calculation
  useEffect(() => {
    if (commuterPos && driverPos) {
      const d = getDistance(
        commuterPos.lat,
        commuterPos.lng,
        driverPos.lat,
        driverPos.lng
      );
      setDistance(d.toFixed(2));
    }
  }, [commuterPos, driverPos]);

  return (
    <>
      <div ref={mapRef} style={{ height: "70vh", width: "100%" }}></div>
    </>
  );
};

export default LiveMap;
