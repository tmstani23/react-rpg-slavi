import React from 'react';
import Actor from '../actor';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';


const Player = ( {skin} ) => {
    // pixel h and width for the sprite
    const data = {
        h: 32,
        w: 32,
    }
    const maxSteps = 3;
    // direction, sprite picture, walk method and sprite x,y position are destructured from the useWalk hook
    const {dir, step, walk, position} = useWalk(maxSteps);

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
        
        walk(direction);
        
    })

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