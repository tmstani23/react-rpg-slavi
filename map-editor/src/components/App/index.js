import React, {useEffect, useState } from 'react';
import '../../map_editor_resources/css/styles.css';
import TilePalette from '../Tile-Palette';
import useDraggable from "../../hooks/use-draggable";
import springSprite from '../../map_editor_resources/sprites/rpg-nature-tileset/spring.png';
import fallSprite from '../../map_editor_resources/sprites/rpg-nature-tileset/fall.png';
import winterSprite from '../../map_editor_resources/sprites/rpg-nature-tileset/winter.png';

import Map from '../Map';


const App = () => {
    const [tileset, setTileset] = useState({
        springSprite,
        fallSprite,
        winterSprite
    });
    //Initialize passable state
    const [impassableTile, setImpassableTile] = useState(true);
    const [sprite, setSprite] = useState("springSprite");
    const [tiles, setTiles] = useState([]);
    const mapSize = {width: 800, height: 600};
    const [bgTile, setBgTile] = useState({x: -32, y: -32, v: { x: -32, y: -32, isImpassable: false }})
    const {position} = useDraggable("handle");
    const [activeTile, setActiveTile] = useState({x: 1 * 32, y: 4 * 32, v: { x: -32, y: -32, isImpassable: false }})

    useEffect(() => {
        const _tiles = [];
        let id = 0;

        for(let y = 0; y < mapSize.height; y = y + 32) {
            const row = [];
            for(let x = 0; x < mapSize.width; x = x + 32) { 
                row.push({
                    x,
                    y,
                    id: id++,
                    v: { x: -32, y: -32, isImpassable: false },
                })
            }
            _tiles.push(row);
        }
        setTiles(_tiles);
    }, [])

    return <div
        id='__app'
        style={{
            position: "relative",
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "grey",
            overflow: "hidden",
            border: "1px solid black",
        }}
    >
        <TilePalette 
            position={position}
            tileset={tileset}
            setTileset={setTileset}
            setSprite={setSprite}
            sprite={sprite}
            activeTile={activeTile}
            setActiveTile={setActiveTile}
            setBgTile={setBgTile}
            bgTile={bgTile}
            mapTiles={tiles}
            impassableTile={impassableTile}
            setImpassableTile={setImpassableTile}
        />

        <Map 
            tiles={tiles} 
            tileset={tileset} 
            mapSize={mapSize} 
            activeTile = {activeTile}
            setTiles = {setTiles}
            sprite = {sprite}
            bgTile={bgTile}
        />
        
    </div>
}

export default App;