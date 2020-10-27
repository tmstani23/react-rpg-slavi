import {useState} from 'react';

const useWalk = (maxSteps) => {
    // [getter/setter] = useState(default)
    const [dir, setDir] = useState(0);
    const [step, setStep] = useState(0);

    //Hash table that maps directions to integers
    const directionsHash = {
        down: 0,
        left: 1,
        right: 2,
        up: 3,
    };

    // 
    const walk = (dir) => {
        

        //set direction integers from hashmap into Dir state
        setDir(directionsHash[dir]);
        // add one to step value if previous step is less than maxSteps else return 0
        setStep(prev => prev < maxSteps -1 ? prev + 1 : 0)
    }

    return {
        walk,
        dir,
        step,
        directionsHash
    }
}

export default useWalk;