// const socket = io("http://localhost:3000"); // backend URL

// socket.on("connect", () => {
//   console.log("Connected to backend:", socket.id);
// });

// // create map from class container
// const mapContainer = document.querySelector(".mapPlaceholder");
// const map = L.map(mapContainer).setView([0,0], 10);

// // add tile layer
// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// // marker storage
// const marker = {};

// // send own location
// if(navigator.geolocation){
//     navigator.geolocation.watchPosition(
//         (position)=>{
//             const {latitude, longitude} = position.coords;
//             socket.emit("send-location",{latitude,longitude});

//             // show/update own marker
//             if(!marker['me']){
//                 marker['me'] = L.marker([latitude, longitude], {title:'You'}).addTo(map).bindPopup("You");
//                 map.setView([latitude, longitude], 14);
//             } else {
//                 marker['me'].setLatLng([latitude, longitude]);
//             }
//         },
//         (err)=>{
//             console.error(err);
//         },
//         {
//             enableHighAccuracy:true,
//             maximumAge:0,
//             timeout:5000
//         }
//     );
// }

// receive other users' location
// socket.on("receive-location", (data)=>{
//     const {latitude, longitude, id} = data;
//     if(!marker[id]){
//         marker[id] = L.marker([latitude, longitude]).addTo(map).bindPopup("User: " + id);
//     } else {
//         marker[id].setLatLng([latitude, longitude]);
//     }
// });

// // remove marker on disconnect
// socket.on("user-disconnected",(id)=>{
//     if(marker[id]){
//         map.removeLayer(marker[id]);
//         delete marker[id];
//     }
// });
