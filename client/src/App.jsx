import React, {useState,useEffect} from 'react';
import Player from './components/player'
import maleSkin1 from './resources/m1.png';
import Map from './components/Map';
import springSprite from '../../client/src/resources/rpg-nature-tileset/spring.png';
import fallSprite from '../../client/src/resources/rpg-nature-tileset/fall.png';
import winterSprite from '../../client/src/resources/rpg-nature-tileset/winter.png';
//import getMapFilenames from './hooks/get-map-filenames';
//import currentMapTiles from './components/Map/map1.json'


function App() {
  const [tileset, setTileset] = useState({
    springSprite,
    fallSprite,
    winterSprite
  });
  const [sprite, setSprite] = useState("springSprite");
  const [tiles, setTiles] = useState([]);
  const mapSize = {width: 800, height: 600};
  


  useEffect(() => {
    
    fetch('http://localhost:3002/api/get-map', {
      method: 'GET',
      headers: {
      'Content-type': 'application/json'
      }, 
      
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setTiles(res);
        
      })
      .catch(err => console.log(err))
    
      
}, [])
  return (
    <div>
      <Map mapSize={mapSize} tiles={tiles} tileset={tileset} sprite={sprite} >
        <Player skin={maleSkin1} />
      </Map> 
    </div>
  );
}

export default App;
