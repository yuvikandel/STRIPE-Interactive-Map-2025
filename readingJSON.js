// import csv-parser library and file system modules
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

// create a readable stream from the csv file
fs.createReadStream('ZebraMigrationData.csv')
  .pipe(csv())
  .on('data', (row) => {
    // for each row extract the 'latitude' and 'longitude' values and create a new object, then push that into the 'results' array
        results.push({
            'latitude' : row.latitude,
            'longitude' : row.longitude
        })
  })
  // listen until the stream has finished, and then run this
  .on('end', () => {
    console.log(results);
    // convert the 'results' array into a json string
    let json = JSON.stringify(results);
    // write the generated json string in a new file named 'output.json'
    fs.writeFileSync('output.json', json);
});