import React from 'react';

import '../../resources/styles.css';

const Sprite = ({spriteImage, position, data}) => {
    
    const {x, y, h , w} = data;
    //console.log(position);
    return (
        <div
            style={{
                zIndex: 2,
                position: "absolute",
                // top andd left are position of the sprite on the screen
                top: position.y,
                left: position.x,
                // height and width are the size to parse for the specific character on the spritesheet
                height:`${h}px`,
                width:`${w}px`,
                backgroundImage: `url(${spriteImage})`,
                backgroundRepeat: "no-repeat",
                // starting point - top left sprite in the sprite sheet
                backgroundPosition: `-${x}px -${y}px`
            }}
        >
            
        </div>
    )
    
}

export default Sprite;