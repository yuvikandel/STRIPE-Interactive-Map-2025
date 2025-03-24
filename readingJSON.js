/**const fs = require("fs");
csv = fs.readFileSync("ZebraMigrationData.csv");

const array = csv.toString().split("\r");
console.log(array);
let result = [];

let headers = array[0].split(", ")

for (let i = 1; i < array.length - 1; i++) {
    let obj = {}

    let str = array[i]
    let s = ''

    let flag = 0
    for (let ch of str) {
        if (ch === '"' && flag === 0) {
            flag = 1
        }
        else if (ch === '"' && flag == 1) flag = 0
        if (ch === ', ' && flag === 0) ch = '|'
        if (ch !== '"') s += ch
    }

    let properties = s.split("|")

    for (let j in headers) {
        if (properties[j].includes(", ")) {
            obj[headers[j]] = properties[j]
                .split(", ").map(item => item.trim())
        }
        else obj[headers[j]] = properties[j]
    }
    result.push(obj)
}
//console.log(result)
let json = JSON.stringify(result);

//fs.writeFileSync('output.json', json);**/

const csv = require('csv-parser')
const fs = require('fs')
const results = [];
let lat_values = [];
let long_values = [];

fs.createReadStream('ZebraMigrationData.csv')
  .pipe(csv())
  .on('data', (row) => {
       // lat_values.push(latitude)
        //longitude = row.longitude;
       // long_values.push(longitude)
        //console.log(lat_values)
        results.push({
            'latitude' : row.latitude,
            'longitude' : row.longitude
        })
  })
  .on('end', () => {
    console.log(results);
    let json = JSON.stringify(results);
    fs.writeFileSync('output.json', json);
});