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
            top: `${x + walkDistanceModifier[dir].x >= -10 && y + walkDistanceModifier[dir].y <= -10}`,
            right: `${x + walkDistanceModifier[dir].x >= 780 && y + walkDistanceModifier[dir].y  >= -10}`,
            bottom: `${x + walkDistanceModifier[dir].x <= 780 && y + walkDistanceModifier[dir].y  >= 580}`,
            left: `${x + walkDistanceModifier[dir].x <= -10 && y + walkDistanceModifier[dir].y  <= 580}`,
        }
        
        //check if any of the boundaries have been reached and if so return true
        for(const key in mapBoundaries) {
            //console.log(mapBoundaries[key], key, "key in mapBoundaries")
            if(mapBoundaries[key] === 'true') {
                failedBoundaryCheck = true;
            } 
            
        }
        //console.log(mapBoundaries.top, position);
        //console.log(failedBoundaryCheck)
        return failedBoundaryCheck;
    }

    const checkIfImpassableTile = (playerPos, dir, impassableTiles) => {
        const {x, y} = playerPos;
        let tilesFailedBoundaryCheck = [];
        //console.log(x,y, 'playerpos')
        //console.log(dir, impassableTiles);
        let failedBoundaryCheck = false;
        
        
        //loop through impassable tiles
        impassableTiles.map((tileRowArrays) => {
            //console.log(tileRowArrays);
            //Loop through each array
            tileRowArrays.map((tileObj) => {
                const tilePos = {tileX: tileObj['x'], tileY: tileObj['y']}
                
                //console.log(tilePos.tileX, tilePos.tileY);
                 //     run tile boundary check function
               
                
                tilesFailedBoundaryCheck.push(isTileBoundaryReached(playerPos, dir, tilePos))
                
                
            })
        })

        //console.log(tilesFailedBoundaryCheck, 'tilesFailedBoundaryCheck')
        if(tilesFailedBoundaryCheck.includes(true)) {
            console.log("failedBoundaryCheck")
        }
        
        return failedBoundaryCheck
       
    } 

    const isTileBoundaryReached = (playerPos, playerFacingDir, tilePos) => {
        const {x, y} = playerPos;
        const {tileX, tileY} = tilePos
        const tileSize = 32;
        const boundaryCheckEdgesPassed = []
        let failedBoundaryCheck = false;
        
        const tileBoundaries = {
            top: `${x + walkDistanceModifier[playerFacingDir].x >= tileX && y + walkDistanceModifier[playerFacingDir].y >= tileY}`,
            right: `${x + walkDistanceModifier[playerFacingDir].x <= tileX + tileSize && y + walkDistanceModifier[playerFacingDir].y  >= tileY}`,
            bottom: `${x + walkDistanceModifier[playerFacingDir].x <= tileX + tileSize && y + walkDistanceModifier[playerFacingDir].y  <= tileY + tileSize}`,
            left: `${x + walkDistanceModifier[playerFacingDir].x >= tileX && y + walkDistanceModifier[playerFacingDir].y  <= tileY + tileSize}`,
        }
        
        //check if any of the boundaries have been reached and if so return true
        for(const key in tileBoundaries) {
            //console.log(mapBoundaries[key], key, "key in mapBoundaries")
            if(tileBoundaries[key] === 'true') {
                //console.log(tileX, tileY, key)
                let trueLocationObj = {
                    tileX,
                    tileY,
                    key
                }
                boundaryCheckEdgesPassed.push(trueLocationObj);
            } 
            
        }

        console.log(boundaryCheckEdgesPassed.length)
        //console.log(tileBoundaries.top, playerPos);
        console.log(boundaryCheckEdgesPassed)
        return boundaryCheckEdgesPassed.length == 4 ? true : false
        
        //console.log(failedBoundaryCheck)
         
    }

    //sets the sprite x/y position on screen and selects which step in the sprite spritesheet to render
    const walk = (dir, mapTiles) => {
        

        //set direction integers from hashmap into Dir state
        setDir(prev => {
            //if current direction matches the previous direction then move else remain facing same dir
            if(directionsHash[dir] === prev) {
                //check if havent reached map boundary or impassable tile
                //console.log(checkIfReachedBoundary(position, dir));
                ;

                if(checkIfReachedBoundary(position, dir) !== true && checkIfImpassableTile(position, dir, mapTiles) !== true) {
                    
                    move(dir)
                } 
                // else {
                //     return;
                // } 
                    
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
            // console.log(prev.x, prev.y, "prev")
            // console.log(position.x, position.y, 'position')
            //console.log(prev.x, prev.y, "prev", position.x, position.y, 'position')
            
            //console.log(dir, 'dir in move')
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