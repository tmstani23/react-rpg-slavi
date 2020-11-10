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

app.post('/api/get-map', (req, res) => {
  
  const mapFilename = req.body.mapFilename
  console.log(mapFilename, "in get-map route")
  const mapJson = readMapFile(mapFilename);
  //console.log(mapJson, 'mapJson in post route')
  res.send(mapJson)
})

app.get('/api/get-map-filenames', (req, res) => {
  const mapDir = `${path.dirname(__filename)}/maps/`;
  //console.log(mapDir, "dir in getmapfilenames route");
  const mapFilesArr = getFilenamesInDir(mapDir);
  //console.log(mapFilesArr);
  res.status(200).send(mapFilesArr);
})

// POST /api/maps gets JSON bodies
app.post('/api/maps', function (req, res) {
    //console.log(req.body);
    exportMapToFile(req.body);
    res.send({data: 'Map posted!'})
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Helper Functions
const createMapFilename = (sprite) => {
  const currentDate = new Date;
  const currentTime = currentDate.toTimeString();
  const dateString = currentDate.toDateString().replace(/\s/g, '_');
  const timeStr = currentTime
    .replace(/\s/g, '_')
    .replace(/ *\([^)]*\) */g, "")
    .replace(/:\s*/g, ".");
  const finalStr = `${dateString}_${timeStr.substring(0,timeStr.length-1)}`;
  const mapFileName = `${sprite}_map_${finalStr}.json`;
  console.log(mapFileName, "mapfilename")

  return mapFileName;
}

//createMapFilename("winterSprite");

// Map functions
const exportMapToFile = (jsonMap) => {
  //console.log(jsonMap);
  const stringifiedJsonMap = JSON.stringify(jsonMap, null, 4);
  //const parsedJsonMap = JSON.parse(jsonMap.toString());
  const mapSprite = jsonMap["tileSetSprite"]
  console.log(mapSprite)
  const mapName = createMapFilename(mapSprite);
  
  const mapPath = `${path.dirname(__filename)}/maps/${mapName}`;
  

  fs.writeFile(mapPath, stringifiedJsonMap, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
  });
}

const readMapFile = (mapFileName) => {
  let jsonMap = [];
  //mapFileName = "map1.json";
  const mapPath = `${path.dirname(__filename)}/maps/${mapFileName}`;
  
  //console.log(mapPath);


  let stringMap = fs.readFileSync(mapPath, 'utf-8') 
    
  //console.log(stringMap, "stringmap")
  // parse JSON object
  const parsedJsonMap = JSON.parse(stringMap.toString());

  // print JSON object
  //console.log(parsedJsonMap, "parsedJsonmap");

      
  return  parsedJsonMap;  
    
}

const getFilenamesInDir = (dir) => {
  // list all files in the directory
  return fs.readdirSync(dir)

}

