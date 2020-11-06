import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import fs from "fs";


import dragHandleImg from "../../map_editor_resources/img/drag-handle.png";
const tilesetData = require('../../data/tilesets.json');

const TilePalette = ({
    position,
    setBgTile, 
    tileset,
    mapTiles, 
    activeTile, 
    setActiveTile,
    setSprite,
    sprite
}) => {
    
    // Global variables
    const tilesetsJson = Object.keys(tilesetData).map (set => ({
        type: "group",
        name: set.replace(/~/g, " "),
        items: tilesetData[set].variants.map(variant => ({
            value: `${set}/${variant}`,
            label: variant
        }))
    }))
    //console.log(tilesetsJson)

    const tilesetGroup = {...tilesetsJson[0]}
    //console.log(tilesetGroup);
    //console.log(tilesetGroup, tilesetVariant)
    const {width, height} = tilesetData[tilesetGroup.name].size;

    const generatePaletteTileMatrix = () => {
        
        const tiles = [];
        let tileId = 0;

        for(let y = 0; y < height; y = y + 32) {
            const row = [];

            for(let x = 0; x < width; x = x + 32) {
                //Create tile object and push it into row
                row.push({
                    x, 
                    y, 
                    tileId: tileId++
                })
            }

            tiles.push(row);

        }
        return tiles;
    }

    const renderPaletteTiles = (tiles) => (
        
        tiles.map((row, y) => 
            <div 
                style={{
                    display: "flex"
                }}
            > 
                {
                    row.map((tile, x) => 
                    <div 
                        onClick={() => setActiveTile({
                                x: x * 32,
                                y: y * 32
                        })}
                        style={{
                            borderTop: "1px solid black",
                            borderRight: "1px solid black",
                            background: `url(${tileset[sprite]}) -${x*32}px -${y*32}px no-repeat`,
                            width: 32,
                            height: 32,
                        }}
                    />)
                }
            </div>
        )
        
    )
    const renderDragHandle = () => (
        <div style={{display: "flex", margin: 4}}>
            <img        
            id="handle"
            src={dragHandleImg} 
            alt=""
            />
            <div style={{position: "relative", width: 32, marginLeft: 8}}>
                {renderActiveTile()}
            </div>
            <div style={{width: 200, marginLeft: 8}}>
                <Dropdown 
                    options={tilesetsJson}
                    onChange={(tileset) => {
                        console.log(tileset)
                        setSprite(tileset.label)
                        }
                    }
                    value={tileset}
                />
            </div>

            <div style={{width: 200, marginLeft: 8}}> 
                    <button 
                        onClick={() => setBgTile(activeTile)}
                        
                    >
                        Fill Background
                    </button>
                    <button 
                        onClick={() => saveMapFile(mapTiles)}
                        
                    >
                        Export Map
                    </button>
            </div>
            
        </div>
        
    )

    const renderActiveTile = () => (
        <div 
            style={{
                background: `url(${tileset[sprite]}) -${activeTile.x}px -${activeTile.y}px no-repeat`,
                width: 32,
                height: 32,

            }}
        />
    )

    const saveMapFile = (mapTiles) => {
        
        
        let data = JSON.stringify(mapTiles, null, 4);

        console.log(data);

        fetch('/api/maps', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            }, 
            body: data,
          })
            .then(res => res.json())
            .then(res => {
              
              console.log(res, "afterfetch response")
              
            })
            .catch(err => console.log(err))
        
        
    }

    const renderPalette = () => {
        const tiles = generatePaletteTileMatrix();
        
        return (
            <div
                id="palette"
                style={{
                    position: "absolute",
                    border: "1px solid black",
                    top: position.y,
                    left: position.x,
                    zIndex: 100,
                    backgroundColor: "white"
                }}
            >
                {
                    [
                        renderDragHandle(),  
                        renderPaletteTiles(tiles)
                    ]
                }
 
            </div>
        
        )
    }

    return (
        <div>
            {renderPalette(sprite)}
        </div>    
    )
}

export default TilePalette;