import React from 'react';
import Actor from '../actor';
import useKeyPress from '../../hooks/use-key-press';
import useWalk from '../../hooks/use-walk';


const Player = ( {skin} ) => {
    const data = {
        h: 32,
        w: 32,
    }
    const maxSteps = 3;
    const {dir, step, walk} = useWalk(maxSteps);

    useKeyPress((event) => {
        //prevent key from scrolling the browser window
        event.preventDefault();
        //replace the arrow text with an empty string to leave only the direction.
        const direction = event.key.replace("Arrow", "").toLowerCase();

        walk(direction);
        
    })

    return (
        <Actor sprite={skin} data = {data} step={step} dir={dir} />
    )
}

export default Player;