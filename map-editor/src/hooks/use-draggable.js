import {useEffect, useState} from 'react';

const useDraggable = (id) => {
    
    const [position, setPosition] = useState({x:0, y:0});

    useEffect(() => {
        const handle = document.getElementById(id);
        
        handle.addEventListener("mousedown", (event) => {
            event.preventDefault()
            // enable smooth dragging
            handle.style.pointerEvents = "none";

            document.body.addEventListener("mousemove", move)
            document.body.addEventListener("mouseup", () => {
                document.body.removeEventListener("mousemove", move)
                handle.style.pointerEvents = "initial"
            })
        })
        return () => {
            document.body.removeEventListener("mousedown", move)
            document.body.removeEventListener("mouseup", move)
            document.body.removeEventListener("mousemove", move)
        }
    })

    const move = (event) => {
        const pos = {
            // clientX and Y are x/y positions of the mouse
            x: event.clientX,
            y: event.clientY
        }

        setPosition(pos);
    }

    return {
        position
    }
}

export default useDraggable;
