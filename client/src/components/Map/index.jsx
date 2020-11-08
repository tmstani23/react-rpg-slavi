import React from 'react';

const Map = (props) => {
    // console.log(props.children)
    const {mapSize, tiles,tileset, sprite} = props
    const bgTile = {}
    const renderTileLayers = (tileType) => (
        
        <div style={{
            position: "absolute",
            zIndex: 1
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
            {/* {renderTileLayers(bgTile)} */}
            {/* Foreground layer */}
            {renderTileLayers("notBgTile")}
            {props.children}
            
        </div>
        
    )
}

export default Map;