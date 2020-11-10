import React, {useState,useEffect} from 'react';
import Player from './components/player'
import maleSkin1 from './resources/m1.png';
import Map from './components/Map';
import springSprite from '../../client/src/resources/rpg-nature-tileset/spring.png';
import fallSprite from '../../client/src/resources/rpg-nature-tileset/fall.png';
import winterSprite from '../../client/src/resources/rpg-nature-tileset/winter.png';


function App() {
  const [tileset, setTileset] = useState({
    springSprite,
    fallSprite,
    winterSprite
  });
  const [sprite, setSprite] = useState("springSprite");
  const [userSelectedMapFile, setMapFile] = useState("");
  const [tiles, setTiles] = useState([]);
  

  
  

  const fetchMap = (mapFilename) => {
    const data = JSON.stringify({mapFilename: mapFilename}, null, 4);
    console.log(data);
    fetch('http://localhost:3002/api/get-map', {
      method: 'POST',
      headers: {
      'Content-type': 'application/json'
      },
      body: data
      
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        // update sprite with the tileset from res object
        setSprite(res.tileSetSprite);
        //cut the tileset object out of array matrix
        // update tiles with new matrix
        setTiles(res.mapTiles);
        
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    return userSelectedMapFile !== "" ? fetchMap(userSelectedMapFile) : null
    
    
      
}, [userSelectedMapFile])
  return (
    <div>
      <Map 
        tiles={tiles} 
        tileset={tileset} 
        sprite={sprite} 
        userSelectedMapFile={userSelectedMapFile}
        setMapFile={setMapFile}
      >
        <Player skin={maleSkin1} />
      </Map> 
    </div>
  );
}

export default App;
