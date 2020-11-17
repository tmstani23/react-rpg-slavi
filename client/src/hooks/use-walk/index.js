import {useState} from 'react';

const useWalk = (maxSteps) => {
    // player position, direction and step in animation sequence
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

    const checkIfReachedBoundary = (playerPos, dir) => {
        const {x, y} = playerPos;
        let failedBoundaryCheck = '';
        const mapBoundaries = {
            top: `${x + walkDistanceModifier[dir].x > 0 && y + walkDistanceModifier[dir].y < 0}`,
            right: `${x + walkDistanceModifier[dir].x > 765 && y + walkDistanceModifier[dir].y  > 0}`,
            bottom: `${x + walkDistanceModifier[dir].x < 765 && y + walkDistanceModifier[dir].y  > 565}`,
            left: `${x + walkDistanceModifier[dir].x < 0 && y + walkDistanceModifier[dir].y  < 565}`,
        }
        
        //check if any of the boundaries have been reached and if so return true
        for(const key in mapBoundaries) {
            console.log(mapBoundaries[key], key, "key in mapBoundaries")
            if(mapBoundaries[key] === 'true') {
                failedBoundaryCheck = true;
            } 
            
        }
        
        //console.log(mapBoundaries.top, position);
        console.log(failedBoundaryCheck)
        return failedBoundaryCheck;
    }

    //sets the sprite x/y position on screen and selects which step in the sprite spritesheet to render
    const walk = (dir) => {
        

        //set direction integers from hashmap into Dir state
        setDir(prev => {
            //if current direction matches the previous direction then move else remain facing same dir
            if(directionsHash[dir] === prev) {
                //check if reached any map boundary 
                
                //console.log(checkIfReachedBoundary(position, dir));
                if(checkIfReachedBoundary(position, dir) !== true){
                    console.log('check working')
                    move(dir)
                } 

                //else don't move
                
                    
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