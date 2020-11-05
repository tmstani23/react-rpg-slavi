import React, { Children } from 'react';

const Map = ({tiles, tileset, mapSize, bgTile, activeTile, setTiles, sprite}) => {
    

    const cloneMatrix = (matrix) => {
        const clone = new Array(matrix.length);

        for (let i = 0; i < matrix.length; i++) {
            // slice whole row into cloned row
            clone[i] = matrix[i].slice(0)
            //console.log(clone[i], "clone in cloneMatrix");
        }
        return clone;
    } 

    const dropTile = ({x, y}) => {
        setTiles(prev => {
            // clone prev matrix
            
            const clone = cloneMatrix(prev);
            // alter tile 0 x/y to active tile
            const tile = {
                // copy entire tile at xy location and update value to active tile state
                ...clone[y][x],
                v: activeTile,
                tileSprite: sprite
            }
            //swap in active tile to the cloned matrix and return it
            clone[y][x] = tile;
            //console.log(clone[y][x])
            return clone;
        })
    }

    const renderTileLayers = (tileType) => (
        
        <div style={{
            position: "absolute",
            zIndex: 1
        }}>
            {
                tiles.map((row, y) => 
                    <div
                        style={{display: "flex"}}
                    > 
                        {
                            row.map((tile, x) => {
                                return (
                                    <div
                                        onClick={() => dropTile({x, y})}
                                        style={{
                                            borderTop: "1px solid black",
                                            borderRight: "1px solid black",
                                            background: `url(${tileset[sprite]}) -${tileType === bgTile ? bgTile.x : tile.v.x}px -${tileType === bgTile ? bgTile.y : tile.v.y}px no-repeat`,
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
        </div>
    )

    return (
        
    <div
        style={{
            boxSizing: 'border-box',
            backgroundColor: 'white',
            width: mapSize.width,
        }}
    >
         {/* Background Layer */}
        {renderTileLayers(bgTile)}
        {/* Foreground layer */}
        {renderTileLayers("notBgTile")}
        
        
    </div>
)}

export default Map;