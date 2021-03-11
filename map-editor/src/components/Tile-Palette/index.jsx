import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import bowSprite from '../../map_editor_resources/sprites/item-sprites/Bow.png';
import arrowSprite from '../../map_editor_resources/sprites/item-sprites/Bow.png';

import dragHandleImg from "../../map_editor_resources/img/drag-handle.png";
const tilesetData = require('../../data/tilesets.json');

const TilePalette = ({
    itemTiles,
    setItemTiles,
    position,
    setBgTile,
    bgTile, 
    tileset,
    mapTiles, 
    activeTile, 
    setActiveTile,
    setSprite,
    sprite,
    impassableTile,
    setImpassableTile,
}) => {
    
    // Global variables
    //const [activeTileSelected, setActiveTileSelected] = useState(false);
    

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
                    tileId: tileId++,
                    // v: { x: -32, y: -32, isImpassable: false }
                    // could add default passable:true state here
                })
            }

            tiles.push(row);

        }
        return tiles;
    }

    const handlePassableToggle = (event) => {
        //get event status
        const toggleChecked = event.target.checked;
        //update passable state based on event state
        setImpassableTile(toggleChecked);
        //Update the active tile with the new impassable state
        //setActiveTileSelected(!activeTileSelected);
        setActiveTile({
            ...activeTile,
            isImpassable: toggleChecked
        })
        
        //console.log(toggleChecked, activeTile, impassableTile, "in handlePassableToggle function");
    }

    const renderItemTiles = (paletteTiles) => {
        // map through itemTiles and render
        //console.log(itemTiles)
        
        
        let paletteTilesLastRowIndex = paletteTiles.length;
        console.log(paletteTilesLastRowIndex, 'ptlr')
       
        //console.log(lastPaletteTile, 'lastPalTile')
        let x = 0
        let y = paletteTilesLastRowIndex + 1;
        //assign x and y based on the end of the tiles array
                //get x value of end tile
                
        return (
            <div>
                {
                    
                    itemTiles.map((item, index) => {
                        
                        // increment y value for row change
                        console.log(item, 'item')
                        
                        x += item.x
                        y += item.y + index + 1
                        console.log(x,y, 'xy')
                       
                        return (
                            <div 
                                key={y+420+index}
                                style={{
                                    display: "flex"
                                }}
                                onClick={
                                    () => {
                                        setActiveTile({
                                            x: x * 32,
                                            y: y * 32,
                                            isImpassable: impassableTile
                                        
                                        })
                                        
                                    }
                                }
                             > 
                                <img
                                    style={{
                                        borderTop: "1px solid black",
                                        borderRight: "1px solid black",
                                        width: 32,
                                        height: 32,
                                    }}
                                    src={bowSprite} 
                                    alt=""
                                />             
                            </div>
                        )
                        
                    })
                }
                {
                    console.log(activeTile, 'activetileobj')
                }
            </div>
            
            // <div 
            //     style={{
            //         display: "flex", 
            //     }}  
            // >
            //     <img style={{
            //         display: "flex", 
            //         borderTop: "1px solid black",
            //         borderRight: "1px solid black",
            //         width: 32,
            //         height: 32,
            //     }}
            //         src={bowSprite} 
            //         alt=""
            //     />
            //     <img style={{
            //         display: "flex", 
            //         borderTop: "1px solid black",
            //         borderRight: "1px solid black",
            //         width: 32,
            //         height: 32,
            //     }}
            //         src={bowSprite} 
            //         alt=""
            //     />
            // </div> 
        
        )
    }

    const renderPaletteTiles = (tiles) => (
        <div>
            {
                tiles.map((row, y, index) => 
                    <div 
                        key={y+420+index}
                        style={{
                            display: "flex"
                        }}
                    > 
                        {
                            row.map((tile, x) => {
                                //console.log(x,y, 'xy in renderpalTiles')
                                return (
                                    <div 
                                        key={x+420+index}
                                        onClick={
                                            () => {
                                                setActiveTile({
                                                    x: x * 32,
                                                    y: y * 32,
                                                    isImpassable: impassableTile
                                                
                                                })
                                                
                                            }
                                        }
                                        style={{
                                            borderTop: "1px solid black",
                                            borderRight: "1px solid black",
                                            background: `url(${tileset[sprite]}) -${x*32}px -${y*32}px no-repeat`,
                                            width: 32,
                                            height: 32,
                                        }}
                                    >
                                        
                                    </div>
                                    
                                )
                            })
                        
                        }
                    </div>
                )
            }
            {renderItemTiles(tiles)}
        </div>
        
        
    )
    const renderDragHandle = () => (
        <div style={{display: "flex", margin: 4}}>
            
            {/* drag handle image */}
            <img        
            id="handle"
            src={dragHandleImg} 
            alt=""
            />
            
            {/* Active tile icon */}
            <div style={{position: "relative", width: 32, marginLeft: 8}}>
                {renderActiveTile()}
                
                <div>
                            <label for="male">Active Tile Impassable</label>
                            <input type="checkbox" name="impassableTile-checkbox" onClick={(event) => handlePassableToggle(event)}></input>
                        </div>
                
                
            </div>
            
            {/* Map tileset selection dropdown*/}
            <div style={{width: 200, marginLeft: 8}}>
                <Dropdown 
                    options={tilesetsJson}
                    onChange={(tileset) => {
                        //console.log(tileset)
                        setSprite(tileset.label)
                        }
                    }
                    value={tileset}
                />
            </div>
            
            {/* Active buttons and selectors */}
            <div style={{width: 200, marginLeft: 8}}> 
                    <button 
                        onClick={() => setBgTile({
                            ...activeTile,
                            bgTile: true
                        })}
                        
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

    const renderActiveTile = () => {
        // dynamic border based on if tile is passable or not
        
        return (
            <div 
                style={{
                    background: `url(${tileset[sprite]}) -${activeTile.x}px -${activeTile.y}px no-repeat`,
                    width: 32,
                    height: 32,
                    border: `${activeTile.isImpassable ? "2px solid red" : "1px solid black"}`

                }}
            />

        )
        
    }

    const saveMapFile = (mapTiles) => {

        //add sprite to map object
        let jsonMap = {
            tileSetSprite: sprite,
            mapTiles,
            bgTile,
        }

        const dynamicSaveMapUrl = process.env.NODE_ENV === 'production' ? '/api/maps' : 'http://localhost:3002/api/maps';
        console.log(dynamicSaveMapUrl, 'dynamic url in tilePalette comp')

        //console.log(jsonMap);

        let data = JSON.stringify(jsonMap, null, 4);
        
        //console.log(data);

        fetch(dynamicSaveMapUrl, {
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