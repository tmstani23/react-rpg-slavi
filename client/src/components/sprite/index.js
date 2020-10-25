import React from 'react';

const Sprite = () => {
    return (<div
            style={{
                display: "inline-block",
                height:"32px",
                width:"32px",
                backgroundImage: "url(/resources/m1.png)",
                backgroundRepeat: "no-repeat",
                // starting point - top left sprite in the sprite sheet
                backgroundPosition: "0px 0px"
            }}
        >
            
        </div>
    )
    
}

export default Sprite;