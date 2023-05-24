// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

let pineapple = L.featureGroup();
let nonPineapple = L.featureGroup();

let layers = {
    "Pineapple": pineapple,
    "No Pineapple": nonPineapple
}

let layersArray = Object.values(layers); 

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRYXDrGcVuTy0kOc-V_T7AR1TRCigyqvBFEPoXM0o8Jpzz49AfVlZ8-ndLOb-RRxSMu_VJKDMekEOjn/pub?output=csv"

// define the leaflet map
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

// add layer control box
L.control.layers(null,layers).addTo(map)

/*L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);*/

function addMarker(data,layer){
    layers[layer].addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${layer}</h2>`))
    createButtons(data.lat,data.lng,data['Where do you live?'])
    return data
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng,15]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        let layer = setTheLayer(data)
        addMarker(data,layer)
    })
    let allLayers = L.featureGroup(layersArray);
    layersArray.forEach(layer => layer.addTo(map));
    map.fitBounds(allLayers.getBounds());
}

function setTheLayer(data){
    if (data['Do you like pineapple on pizza?'] == "Yes"){
        circleOptions.fillColor = "green"
        circleOptions.radius = 5;
        return "Pineapple"
    }
    else{
        circleOptions.fillColor = "red"
        circleOptions.radius = 3;
        return "No Pineapple"
    }
}

loadData(dataUrl)