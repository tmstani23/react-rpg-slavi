import React, {useEffect, useState } from 'react';
import '../../map_editor_resources/css/styles.css';
import TilePalette from '../../components/tile-palette';
import useDraggable from "../../hooks/use-draggable";
import springSprite from '../../map_editor_resources/sprites/rpg-nature-tileset/spring.png';
import fallSprite from '../../map_editor_resources/sprites/rpg-nature-tileset/fall.png';
import winterSprite from '../../map_editor_resources/sprites/rpg-nature-tileset/winter.png';

import Map from '../../components/map';


const App = () => {
    const [tileset, setTileset] = useState({
        springSprite,
        fallSprite,
        winterSprite
    });
    const [activeTile, setActiveTile] = useState({x: 1 * 32, y: 4 * 32})
    const [tiles, setTiles] = useState([]);
    const [mapSize, setMapSize] = useState({
        width: 800,
        height: 600,
    })
    const {position} = useDraggable("handle")

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
                    v: { x: -32, y: -32 },
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
            activeTile={activeTile}
            setActiveTile={setActiveTile}
            spriteSize={{
                height: 288,
                width: 640,
            }}
        />

        <Map 
            tiles={tiles} 
            tileset={tileset} 
            size={mapSize} 
            activeTile = {activeTile}
            setTiles = {setTiles}
        />
        
    </div>
}

export default App;