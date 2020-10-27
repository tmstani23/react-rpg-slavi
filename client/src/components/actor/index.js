import React from 'react';

import Sprite from '../sprite';


const Actor = ({sprite, data, step = 0, dir = 0}) => {
    
    const {h, w} = data;
    
    return (
        <Sprite spriteImage={sprite} data={{
            x: step * w,
            y: dir * h,
            h,
            w,
          }}
        />
    )
}

export default Actor;