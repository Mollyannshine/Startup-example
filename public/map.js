'use strict'

var map = L.map('map').setView([40.2474025, -111.6541366], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

async function updateMarkers() {
    const data = await getMapData();
    for (const sighting of data) {
      addMarker(sighting);
    }
}

async function getMapData() {
  const rq = {
    method: "GET",
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }
  const data = fetch("/api/getMapData", rq).then((r) => r.json());
  return data;
}

function addMarker(sighting) {
  console.log("Creating marker for:\n", sighting)
  var marker = L.marker(L.latLng(sighting.lat, sighting.lng)).addTo(map);
  marker.bindPopup(`<b>${sighting.name}</b><br>${sighting.breed}<br>${sighting.time}`);
}

updateMarkers();