const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser');
const cors = require("cors");
const fs = require('fs');
const path = require('path');

//Allow all proxy types
app.set('trust proxy', true);

// Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

//cors middleware
app.use(cors());

//ROUTES
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// POST /api/maps gets JSON bodies
app.post('/api/maps', function (req, res) {
    // create user in req.body
    //console.log(typeof req.body);
    //console.log(req.body);
    exportMapToFile(req.body);
    res.send('Map Posted, ')
  })



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Map functions
const exportMapToFile = (jsonMap) => {
  const stringifiedJsonMap = JSON.stringify(jsonMap, null, 4);
  const mapFileName = "map1.json";
  const mapPath = `${path.dirname(__filename)}/maps/${mapFileName}`;
  
  //console.log(mapPath);

  fs.writeFile(mapPath, stringifiedJsonMap, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
  });
}