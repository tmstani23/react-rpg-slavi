import React from 'react';

const Map = ({tiles, tileset, mapSize, bgTile, activeTile, setTiles, sprite}) => {
    

    const cloneMatrix = (matrix) => {
        const clone = new Array(matrix.length);

        for (let i = 0; i < matrix.length; i++) {
            // slice whole row into cloned row
            clone[i] = matrix[i].slice(0)
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
                v: activeTile
            }
            //swap in active tile to the cloned matrix and return it
            clone[y][x] = tile;
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
                                            background: `url(${tileset[sprite]}) -${eval(tileType).x}px -${eval(tileType).y}px no-repeat`,
                                            width: 32,
                                            height: 32,

                                        }}
                                    >
                                    </div>
                                )
                            }
                            

                            
                            )
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
        {renderTileLayers("tile.v")}
        
    </div>
)}

export default Map;