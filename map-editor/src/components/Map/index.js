import React from 'react';


const Map = ({
    tiles, 
    itemSprites,
    tileset, 
    mapSize, 
    bgTile, 
    activeTile, 
    setTiles, 
    sprite,
}) => {
    

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

            //console.log(sprite);
            const tile = {
                // copy entire tile at xy location and update value to active tile state
                ...clone[y][x],
                v: activeTile,
                defaultTile: false,
                selectedTile: true
            }
            //console.log(tile);
            //swap in active tile to the cloned matrix and return it
            clone[y][x] = tile;
            //console.log(clone[y][x])
            return clone;
        })
    }

    const renderTileLayers = (tileType) => (
        
        <div style={{
            position: "absolute",
            zIndex: 1,
            borderBottom: "1px solid black"
        }}>
            {
                tiles.map((row, y) => 
                    <div
                        key={y+420}
                        style={{display: "flex", width: mapSize.width}}
                    > 
                        {
                            row.map((tile, x) => {
                                const tileImpassableBorder = tile['v'].isImpassable ? "3px solid red" : "1px solid black";
                                
                                return (
                                    // render different tiles based on tiletype
                                   <div>
                                       {
                                        tile.v.item && tileType !== bgTile 
                                            ?  <div
                                            key={x+420}
                                            onClick={() => dropTile({x, y})}
                                            style={{
                                                borderTop: tileImpassableBorder,
                                                borderRight: tileImpassableBorder,
                                                background: `url(${itemSprites[tile.v.item.itemObj.spriteName]}) no-repeat`,
                                                width: tile.v.item.itemObj.size.width,
                                                height: tile.v.item.itemObj.size.height,
                                                zIndex: 2

                                            }}
                                            
                                        >
                                            </div>
                                            : <div
                                                key={x+420}
                                                onClick={() => dropTile({x, y})}
                                                style={{
                                                    borderTop: tileImpassableBorder,
                                                    borderRight: tileImpassableBorder,
                                                    background: `url(${tileset[sprite]}) -${tileType === bgTile ? bgTile.x : tile.v.x}px -${tileType === bgTile ? bgTile.y : tile.v.y}px no-repeat`,
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