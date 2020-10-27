import React from 'react';

import '../../resources/styles.css';

const Sprite = ({spriteImage, data}) => {
    
    const {x, y, h , w} = data;
    
    return (
        <div
            style={{
                display: "inline-block",
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