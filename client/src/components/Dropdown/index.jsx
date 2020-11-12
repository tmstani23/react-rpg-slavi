import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import getMapFilenames from '../../hooks/get-map-filenames';

const DropdownComponent = (props) => {
    const {userSelectedMapFile, setIsHome, setMapFile} = props
    const mapFileNames = getMapFilenames();
    //console.log(mapFileNames)
    console.log(userSelectedMapFile);
    
    //let tileset = {springSprite: 'springSprite'}
    const options = mapFileNames;
    return(
            <div style={{
                margin: 4, 
                width: '250px', 
                marginLeft: 8}}>
                <Dropdown 
                    options={options}
                    onChange={(options) => {
                        //console.log(options.value)
                        setMapFile(options.value)
                        //show map screen
                        setIsHome(false)
                        }
                    }
                    value={userSelectedMapFile}
                />
            </div>

            
            
    )
    
}

export default DropdownComponent;