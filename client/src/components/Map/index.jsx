import React, {useEffect, useState} from 'react';
import DropdownComponent from '../../components/Dropdown'

const Map = (props) => {
    
    const {tiles,tileset, sprite, setMapFile, userSelectedMapFile} = props
    const bgTile = {}
    const mapSize = {width: 800, height: 600};
    
    
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
            <DropdownComponent 
                className="dropdown-layout-div" 
                userSelectedMapFile={userSelectedMapFile}
                setMapFile={setMapFile}
            />
            {/* Background Layer */}
            {/* {renderTileLayers(bgTile)} */}
            {/* Foreground layer */}
            {renderTileLayers("notBgTile")}
            {props.children}
            
        </div>
        
    )
}

export default Map;