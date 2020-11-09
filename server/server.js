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

app.get('/api/get-map', (req, res) => {

  const mapJson = readMapFile();
  console.log(typeof mapJson);
  res.send(mapJson)
})

// POST /api/maps gets JSON bodies
app.post('/api/maps', function (req, res) {
    // create user in req.body
    //console.log(typeof req.body);
    //console.log(req.body);
    exportMapToFile(req.body);
    res.send({data: 'Map posted!'})
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

const readMapFile = () => {
  let jsonMap = [];
  const mapFileName = "map1.json";
  const mapPath = `${path.dirname(__filename)}/maps/${mapFileName}`;
  
  //console.log(mapPath);

  // read JSON object from file
//   try {
//     fs.readFileSync(mapPath, 'utf-8', (err, map) => {
//       // if (err) {
//       //     throw err;
//       // }
  
//       // parse JSON object
//       const parsedJsonMap = JSON.parse(map.toString());
  
//       // print JSON object
//       console.log(parsedJsonMap);
//       jsonMap = parsedJsonMap;
      
  
//     })
// } catch (error) {
//     console.error(err);
// }

let stringMap = fs.readFileSync(mapPath, 'utf-8') 
  
//console.log(stringMap, "stringmap")
// parse JSON object
const parsedJsonMap = JSON.parse(stringMap.toString());

// print JSON object
//console.log(parsedJsonMap, "parsedJsonmap");

    
return  parsedJsonMap;  
    
  
  
}