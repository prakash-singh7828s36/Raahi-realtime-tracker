export async function getRouteData(start, end) {
  const apiKey = "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImU5MmYzYTQ3ZGQ2NTQ5NWNhOTA5OTU0NzMxNGI5OWRhIiwiaCI6Im11cm11cjY0In0=";

  const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";

  const body = {
    coordinates: [
      [start.lng, start.lat],
      [end.lng, end.lat],
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    const route = data.features[0];

    return {
      distance: route.properties.summary.distance / 1000, // km
      duration: route.properties.summary.duration / 60, // minutes
      polyline: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
    };
  } catch (err) {
    console.error("ROUTE ERROR:", err);
    return null;
  }
}
