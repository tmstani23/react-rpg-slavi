import React from 'react';
import dragHandleImg from "../../map_editor_resources/img/drag-handle.png";
//import springSprite from '../../map_editor_resources/sprites/rpg-nature-tileset/spring.png';


const TilePalette = ({position, tileset, spriteSize}) => {
    
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

    //console.dir(tileset.springSprite)

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
            {
                tiles.map((row, y) => 
                    <div 
                        style={{
                            display: "flex"
                        }}
                    > 
                        {
                            row.map((tile, x) => <div style={{
                                borderTop: "1px solid black",
                                borderRight: "1px solid black",
                                background: `url(${tileset.springSprite}) -${x*32}px -${y*32}px no-repeat`,
                                width: 32,
                                height: 32,

                            }}> 
                            </div>)
                        }
                    </div>
                )
            }
        </div>
    )
}

export default TilePalette;