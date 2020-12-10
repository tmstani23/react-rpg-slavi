import React, {useEffect, useState} from 'react';
import DropdownComponent from '../../components/Dropdown'

const Map = (props) => {
    
    const {tiles, setIsHome, tileset, bgTile, sprite} = props
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