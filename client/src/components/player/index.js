import React, {useEffect, useState} from 'react';
import Actor from '../actor';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';

 
const Player = ( {skin, tiles} ) => {
    //state for impassable tiles
    const [impassableTilesState, setImpassableTilesState] = useState([]); 
    // pixel h and width for the sprite
    const data = {
        h: 32,
        w: 32,
    }
    const maxSteps = 3;
    // direction, sprite picture, walk method and sprite x,y position are destructured from the useWalk hook
    const {dir, step, walk, position} = useWalk(maxSteps);

    

    const parseOutImpassableTiles = (mapTiles) => {
        // -loop through all rows in map tiles matrix
        const impassableTiles = mapTiles.map((row) => {
           //in each row return an array containing only tiles with impassable flag
            return row.filter((tile) => {
                //console.log(tile['v'].isImpassable);
                // -check if tile is passable
                if(tile['v'].isImpassable) {
                    // -if not passable
                    //save tile to array
                    return tile;
                    
                }
            })
            
        }).filter(notEmptyArr => {
            //Filter out all the empty arrays that contained no impassable tiles
            if(notEmptyArr.length !== 0) {
                return notEmptyArr;
            }
        })
        //console.log(impassableTiles)
        setImpassableTilesState(impassableTiles);
    }

    // Call the useKeyPress function to add event listener for keypress
    useKeyPress((event) => {
        //prevent key from scrolling the browser window
        event.preventDefault();
        
        const direction = event.key.includes("Arrow") 
            // If the keypress is an arrowkey:
            //replace the arrow text with an empty string to leave only the direction.
            ? event.key.replace("Arrow", "").toLowerCase()
            // else if any other key set direction to down
            : "down"
        walk(direction, impassableTilesState);
        
    })

    useEffect(() => {
        return parseOutImpassableTiles(tiles)
        
        
          
    }, [tiles])

    return (
        <Actor 
            sprite={skin} 
            data = {data} 
            step={step} 
            dir={dir} 
            position={position}
        />
    )
}

export default Player;