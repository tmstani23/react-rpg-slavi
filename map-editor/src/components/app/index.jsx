
import TilePalette from '../../components/tile-palette';
import useDraggable from "../../hooks/use-draggable";

const App = () => {
    
    const {position} = useDraggable("handle")

    return <div
        style={{
            position: "relative",
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: "grey",
            overflow: "hidden",
            border: "1px solid black",
        }}
    >
        <TilePalette 
            position={position}
            spriteSize={{
                height: 288,
                width: 640,
            }}
        />
    </div>
}

export default App;