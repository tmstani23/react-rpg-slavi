import React from 'react';

import Sprite from '../sprite';

// Actor rendors the sprite image and handles sprite actions
const Actor = ({
    sprite, 
    data, 
    position={x: 0, y: 0}, 
    step = 0, 
    dir = 0
}) => {
    
    const {h, w} = data;
    
    return (
        //step/dir are used to find the place in the spritesheet for the different walk images
        <Sprite 
            spriteImage={sprite} 
            data={{
                x: step * w,
                y: dir * h,
                h,
                w,
            }}
            // position is the x/y location of the image on the screen
            position={position}
        />
    )
}

export default Actor;