/**const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let lat_values = [];
let long_values = [];

fs.createReadStream('ZebraMigrationData.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    //console.log(results);
    for (i = 0; i < results.length; i++) {
        let latitude = results[i].latitude;
        lat_values.push(latitude)
        let longitude = results[i].longitude;
        long_values.push(longitude)
    }
    let location = [lat_values, long_values]
    console.log(location)
    return location
});**/

var mymap = L.map('map').setView([0, 0], 2);
var zebra_img = L.icon({
    iconUrl: 'pinkzebra_cute.png',
    iconSize:     [30, 30], // size of the icon
});
var bird_img = L.icon({
    iconUrl: 'pinkbird_cute.png',
    iconSize:     [30, 30], // size of the icon
});
var dolphin_img = L.icon({
    iconUrl: 'pinkdolphin_cute.png',
    iconSize:     [30, 30], // size of the icon
});

for (i = 0; i < location[0].length; i++) {
    var zebra_marker1 = L.marker([location[0][i], location[1][i]], {icon: zebra_img}).addTo(mymap)
};
//var zebra_marker2 = L.marker([20.7914, 25.4734], {icon: zebra_img}).addTo(mymap)
//var zebra_marker3 = L.marker([2.3333, 34.8333], {icon: zebra_img}).addTo(mymap)
function toggleZebra() {
    zebra_card = document.getElementById('zebraCard');
    zebra_card.style.display = 'block';
};
function hideElement(idName) {
    element = document.getElementById(idName);
    element.style.display = 'none';
}
zebra_marker1.on('click', toggleZebra)
zebra_marker2.on('click', toggleZebra)
zebra_marker3.on('click', toggleZebra)
var polygon = L.polygon([
    [22.3285, 24.6849],
    [20.7914, 25.4734],
    [2.3333, 34.8333]
]).addTo(mymap);
/**L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);**/
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {maxZoom: 20, minZoom:2, attribution});
tiles.addTo(mymap)