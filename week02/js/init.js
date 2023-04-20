var mario = 3;
var age = 12;
var combined = mario + age;
console.log(combined);
//console.log('Hello Asian Am 191 from linked Javascript!');

//console.log("Hello Asia-Am 191A! :)")
let mapOptions = {'center': [34.0709,-118.444],'zoom':14}

// JavaScript const variable declaration
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);
// Leaflet tile layer, i.e. the base map
Stamen_Toner = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map); 

//JavaScript let variable declaration to create a marker
let circle = L.circle([34.07263858263363, -118.45094762691432], {
	color: 'blue',
	fillColor: 'gold',
	fillOpacity: '0.5',
	radius: 200
}).addTo(map)
.bindPopup('Especially living off campus this year, I have grown to appreciate UCLA dining halls even more.' + '</br>' +'<center><img src="images/bplate.jpeg" height="150px"/></center>')
.openPopup();

        //JavaScript let variable declaration to create a marker
let marker = L.marker([34.06294791913941, -118.44725869598359]).addTo(map) 
.bindPopup('Nothing beats the value of BJs Pizookies on a Tuesday night!')
.openPopup();

function addMarker(latitude,longitude,message){
    L.marker([latitude,longitude]).addTo(map).bindPopup(message)
}

fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.place;
            }).addTo(map);
    })
