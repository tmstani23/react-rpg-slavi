import {useEffect} from 'react';

const useKeyPress = (fn) => {
    useEffect(() => {
        window.addEventListener("keydown", fn)
        // listener cleanup function
        return () => window.removeEventListener('keydown', fn);
    }, 
    // dependency list - if fn changes than this hook will reload
    [fn])
}

export default useKeyPress;