// JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 15); // (1)!

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); // (2)!

//JavaScript let variable declaration to create a marker
let marker = L.marker([34.068700, -118.450660]).addTo(map) // (3)!
		.bindPopup('The University Cooperative Housing Association (UCHA) was a great place to live on a budget when I first got to Westwood in March of 2021!')
		.openPopup();

let marker2 = L.marker([34.0743005, -118.4400353]).addTo(map) // (3)!
	.bindPopup('Bunche Hall was where I took my first Asian American Studies class at UCLA over the summer of 2022!')
	.openPopup();

let marker3 = L.marker([34.0760913, -118.440265]).addTo(map) // (3)!
	.bindPopup('Melnitz Hall, Parking Structure 3, and the Sculpture Garden are some of my favorite nighttime running destinations when I need a little time alone to clear my head.')
	.openPopup();
