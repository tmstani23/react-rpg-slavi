import {useState} from 'react';

const useWalk = (maxSteps) => {
    // [getter/setter] = useState(default)
    const [position, setPos] = useState({x: 0, y: 0});
    const [dir, setDir] = useState(0);
    const [step, setStep] = useState(0);

    //Hash table that maps directions to integers
    const directionsHash = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    };

    const stepSize = 16;

    const walkDistanceModifier = {
        down: {x: 0, y: stepSize},
        left: {x: -stepSize, y: 0},
        right: {x: stepSize, y: 0},
        up: {x: 0, y: -stepSize},
    }

    //sets the sprite x/y position on screen and selects which step in the sprite spritesheet to render
    const walk = (dir) => {
        

        //set direction integers from hashmap into Dir state
        setDir(prev => {
            //if current direction matches the previous direction then move else just turn
            if(directionsHash[dir] === prev) {
                 move(dir)
            }
            return directionsHash[dir]
        });
        // add one to step value if previous step is less than maxSteps else return 0
            //prev refers to the previous step state
        setStep(prev => prev < maxSteps -1 ? prev + 1 : 0)
    }

    const move = (dir) => {
        // sets the x and y position of the sprite on the screen
        return setPos((prev) => {
            // new position is the previous position plus a pixel distance modifier.  
            return {
                x: prev.x + walkDistanceModifier[dir].x,
                y: prev.y + walkDistanceModifier[dir].y
            }}
        )  
    }

    return {
        walk,
        dir,
        step,
        position
    }
}

export default useWalk;