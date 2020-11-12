import React from 'react'; 
import DropdownComponent from '../Dropdown';

const MapSelect = ({setMapFile, userSelectedMapFile, setIsHome}) => {
    return (
        <div>
            <h1>React Slavi Rpg</h1>
            <h2>Select your map</h2>
            <DropdownComponent 
                setIsHome={setIsHome}
                className="dropdown-layout-div" 
                userSelectedMapFile={userSelectedMapFile}
                setMapFile={setMapFile}
            />
            
        </div>
    )
}

export default MapSelect;