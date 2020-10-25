import React from 'react';

import '../../resources/styles.css';
import maleSprite01 from '../../resources/m1.png';

const Sprite = (image, data) => {
    
    const {x, y, h , w} = data;
    const spriteImage = image.image

    console.log(image)
    
    return (
        <div
            style={{
                display: "inline-block",
                height:`32px`,
                width:`32px`,
                backgroundImage: `url(${spriteImage})`,
                backgroundRepeat: "no-repeat",
                // starting point - top left sprite in the sprite sheet
                backgroundPosition: "0px 0px"
            }}
        >
            
        </div>
    )
    
}

export default Sprite;