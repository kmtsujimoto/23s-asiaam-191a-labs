// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':12}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var greenIcon = new L.Icon({
	iconUrl: 'images/marker-icon-2x-green.png',
	shadowUrl: 'images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

// create a function to add markers
function addMarker(lat,lng,title,message){
    //console.log(message)
    let mark = L.marker([lat,lng],{icon:greenIcon}).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => {
            //console.log(results.data)
            results.data.forEach(record=> {
                    if(record["If you have one, what is your favorite fruit?"]!=undefined) {
                        console.log(record);
                        let name = record["What is your first name?"] + "'s Favorite Fruit";
                        let caption = "My favorite fruit is " + record["If you have one, what is your favorite fruit?"].toLowerCase() + "!";
                        addMarker(record.lat, record.lng, name, caption)
                    }
                }
            )
            // for (let i=0; i<results.data.length; i++){
            //     console.log(results.data[i].lat)
            //     //addMarker(results[i][0],sampleDataArray[i][1])
            //     addMarker(results.data[i].lat,results.data[i].lng)
            // }
        }
    })
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("buttons").appendChild(newButton); 
}

const dataURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQQlyzPUtM8jFgj_2wA4CbP-eyQKTEdFFuQezfwGlC232cp6EL_qrkAccIdbdwKvVu4fzNlbrHXVa1L/pub?output=csv"
loadData(dataURL);

const farmersMarketArray = [[37.671167178584305, -122.08461510397387, "Hayward Farmers Market"],[34.06185543754257, -118.4462763636711, "Westwood Village Farmers Market"],[37.30496079230132, -121.89631919115006, "Willow Glen Farmers Market"]]
for(let i=0;i<farmersMarketArray.length;i++){
    addMarket(farmersMarketArray[i][0],farmersMarketArray[i][1],farmersMarketArray[i][2])
}
function addMarket(lat,lng,title){
    //console.log(message)
    let mark = L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2>`)
    createButton(lat,lng,title);
    return title
}

function createButton(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("button").appendChild(newButton); 
}