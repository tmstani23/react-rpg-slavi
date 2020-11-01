import React, {useState} from 'react';


import dragHandleImg from "../../map_editor_resources/img/drag-handle.png";



const TilePalette = ({
    position, 
    tileset, 
    paletteSize, 
    activeTile, 
    setActiveTile,
    setSprite,
    sprite
}) => {
    
    const generatePaletteTileMatrix = () => {
        
        const {width, height} = paletteSize;
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
    
    const selectTileset = (season) => {
        
        switch(season) {
            case "fall":
                setSprite("fallSprite")
              break;
            case "spring":
                setSprite("springSprite")  
              break;
            case "winter":
                setSprite("winterSprite")
                break;
            default:
                setSprite("springSprite")
          }  
        console.log(sprite)

        
        return 1;
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
        <div>
            <img        
            id="handle"
            src={dragHandleImg} 
            alt=""
            />
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

    const renderSpriteSelectButtons = () => (
        <div className="center-row">
            <button onClick={() => selectTileset("spring")}>Spring</button>
            <button onClick={() => selectTileset("fall")}>Fall</button>
            <button onClick={() => selectTileset("winter")}>Winter</button>
        </div>
    )


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
                        renderActiveTile(), 
                        renderSpriteSelectButtons(), 
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