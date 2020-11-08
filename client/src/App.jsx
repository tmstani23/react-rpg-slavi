import React, {useState} from 'react';
import Player from './components/player'
import maleSkin1 from './resources/m1.png';
import Map from './components/Map';
import springSprite from '../../client/src/map-editor/src/map_editor_resources/sprites/rpg-nature-tileset/spring.png';
import fallSprite from '../../client/src/map-editor/src/map_editor_resources/sprites/rpg-nature-tileset/fall.png';
import winterSprite from '../../client/src/map-editor/src/map_editor_resources/sprites/rpg-nature-tileset/winter.png';
import currentMapTiles from './components/Map/map1.json'


function App() {
  const [tileset, setTileset] = useState({
    springSprite,
    fallSprite,
    winterSprite
  });
  const [sprite, setSprite] = useState("springSprite");
  const [tiles, setTiles] = useState(currentMapTiles);
  const mapSize = {width: 800, height: 600};
  console.log(currentMapTiles)
  return (
    <div>
      <Map mapSize={mapSize} tiles={tiles} tileset={tileset} sprite={sprite} >
        <Player skin={maleSkin1} />
      </Map> 
    </div>
  );
}

export default App;
