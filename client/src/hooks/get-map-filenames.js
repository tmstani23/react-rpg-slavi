import {useState, useEffect} from 'react';

const GetMapFilenames = () => {
    const [mapFilenames, setMapFilenames] = useState([]);

    useEffect(() => {
    
        fetch('http://localhost:3002/api/get-map-filenames', {
            method: 'GET',
            headers: {
            'Content-type': 'application/json'
            }, 
        })
            .then(res => res.json())
            .then(res => {
                //console.log(res)
                setMapFilenames(res);
            
            })
            .catch(err => console.log(err))
             
    
        
        
          
    }, [])
    
    return mapFilenames; 
    
}

export default GetMapFilenames;
