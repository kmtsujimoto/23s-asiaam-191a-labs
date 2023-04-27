// declare the variables
let mapCenter = [34.0709,-118.444];
const zoomLevel = 18;

let mapOptions = {
    "zoom": 16,
    "center": [34.0709,-118.444],
    "title": "My Map is great!!!!"
};

// declare the map and use the variables above
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}

fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data => {
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    createButtons(feature.properties.place, latlng)
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map);
    })

function createButtons(title, latlng){
    const newButton = document.createElement("button"); 
    var titleInitial = title.charAt(0);
    newButton.id = "button"+titleInitial;
    newButton.innerHTML = title;
    newButton.addEventListener('click', function(){
        map.flyTo(latlng);
    })
    document.getElementById("contents").appendChild(newButton); 
}