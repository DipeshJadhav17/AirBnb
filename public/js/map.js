// console.log("map js loaded");

// const mapDiv = document.getElementById("map");

// if (mapDiv && typeof L !== "undefined") {
//     const coordinates = JSON.parse(mapDiv.dataset.coordinates);
//     const locationName = mapDiv.dataset.location;

//     const lat = parseFloat(coordinates[1]);
//     const lng = parseFloat(coordinates[0]);

//     const map = L.map("map");

//     map.setView([lat, lng], 13);

//     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; OpenStreetMap contributors",
//         maxZoom: 19
//     }).addTo(map);

//     L.marker([lat, lng])
//         .addTo(map)
//         .bindPopup(locationName)
//         .openPopup();

//     // VERY IMPORTANT
//     setTimeout(() => {
//         map.invalidateSize();   
//     }, 500);
// }


document.addEventListener("DOMContentLoaded", () => {
    const mapDiv = document.getElementById("map");

    if (!mapDiv || typeof L === "undefined") return;

    const coordinates = JSON.parse(mapDiv.dataset.coordinates);
    const locationName = mapDiv.dataset.location;

    const lng = parseFloat(coordinates[0]);
    const lat = parseFloat(coordinates[1]);

    const map = L.map("map", {
        zoomControl: true,
        scrollWheelZoom: true
    }).setView([lat, lng], 13);

    // Clean modern tiles
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "&copy; OpenStreetMap & Carto"
    }).addTo(map);

    // // Move zoom buttons
    // L.control.zoom({
    //     position: "bottomright"
    // }).addTo(map);

    // Custom Airbnb Marker
    const airbnbIcon = L.divIcon({
        html: `<div class="airbnb-pin"><i class="fa-solid fa-house"></i></div>`,
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 40]
    });

    L.marker([lat, lng], { icon: airbnbIcon })
        .addTo(map)
        .bindPopup(`
            <div class="airbnb-popup">
                <strong>${locationName}</strong><br>
                Stay here ✨
            </div>
        `)
        .openPopup();

    setTimeout(() => map.invalidateSize(), 500);
});