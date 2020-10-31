import React, {useState} from 'react';


import dragHandleImg from "../../map_editor_resources/img/drag-handle.png";


const TilePalette = ({
    position, 
    tileset, 
    spriteSize, 
    activeTile, 
    setActiveTile
}) => {
    
    const [sprite, setSprite] = useState("springSprite");

    const {width, height} = spriteSize;
    const tiles = [];
    let tileId = 0

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

    const selectTileset = (season) => {
        
        
        switch(season) {
            case "fall":
                setSprite('fallSprite')
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

        
        return null;
    }

    const renderPalette = () => {
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
                <img        
                    id="handle"
                    src={dragHandleImg} 
                    alt=""
                />
            <div 
                style={{
                    background: `url(${tileset[sprite]}) -${activeTile.x}px -${activeTile.y}px no-repeat`,
                    width: 32,
                    height: 32,

                }}
            />
            <div className="center-row">
                    <button onClick={() => selectTileset("spring")}>Spring</button>
                    <button onClick={() => selectTileset("fall")}>Fall</button>
                    <button onClick={() => selectTileset("winter")}>Winter</button>
            </div>
        
                {
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
                            > 
                            </div>)
                        }
                    </div>
                )
            }
            </div>
        
        )
    }

    //console.dir(tileset.springSprite)

    return (
        <div>
            {renderPalette()}
        </div>    
    )
}

export default TilePalette;