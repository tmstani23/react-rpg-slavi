import React from 'react';
import Sprite from './components/sprite';
import maleSprite1 from './resources/m1.png';

function App() {
  //console.log(maleSprite01)
  
  return (
    <div className = "zone-container">
      <Sprite image={maleSprite1} data={{
        x: 0,
        y: 0,
        h: 32,
        w: 32
      }}/>
    </div>
  );
}

export default App;
