import React, {useEffect, useState} from 'react';

const Map = (props) => {
    
    const {tiles, itemSprites, setIsHome, tileset, bgTile, sprite} = props
    const mapSize = {width: 800, height: 600};
    
    const spriteRenderOptions = (
        tileType, 
        tile
    ) => {
        
        const xPos = tileType === bgTile ? bgTile.x : tile.v.x;
        const yPos = tileType === bgTile ? bgTile.y : tile.v.y;
        let zIndexVar;
        
        zIndexVar = tileType === bgTile ? zIndexVar = 0 : zIndexVar = 1;

        //View active map tiles
        //console.log(tiles);

        return {
            xPos,
            yPos,
            zIndexVar
        }
    }
    
    const renderTileLayers = (tileType) => {
        const defaultTile = {
            x:32,
            y:-32,
            v: { x: -32, y: -32 }
        }
            
        return <div style={{
            position: "absolute",
            zIndex: spriteRenderOptions(tileType, defaultTile).zIndexVar
        }}>
            {
                tiles.map((row, y) => 
                    <div
                        key={y+420}
                        style={{display: "flex"}}
                    > 
                        {
                            row.map((tile, x) => {
                                return (
                                    <div>
                                        
                                        {
                                            tile.v.item && tileType !== bgTile 
                                            ? <div
                                            key={x+420}
                                            style={{
                                                background: `url(${itemSprites[tile.v.item.itemObj.spriteName]}) no-repeat`,
                                                width: tile.v.item.itemObj.size.width,
                                                height: tile.v.item.itemObj.size.height,
                                                zIndex: 2

                                            }}
                                            >
                                                </div>
                                            :
                                            <div
                                            key={x+420}
                                            
                                            style={{
                                                background: 
                                                    `url(${tileset[sprite]}) -${spriteRenderOptions(tileType, tile).xPos}px -${spriteRenderOptions(tileType, tile).yPos}px no-repeat`,
                                                width: 32,
                                                height: 32,
    
                                            }}
                                        >
                                        </div>
                                        }
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                )
            }
            <div>
                <button onClick={() => setIsHome(true)}>Return Home</button>
            </div>
        </div>
        
    }

    return (
        
        <div
            style={{
                boxSizing: 'border-box',
                backgroundColor: 'white',
                width: mapSize.width,
            }}
        >
            
            {/* Foreground layer */}
            {renderTileLayers("notBgTile")}
            {/* Background Layer */}
            {renderTileLayers(bgTile)}
            
            {props.children}
            
        </div>
        
    )
}

export default Map;