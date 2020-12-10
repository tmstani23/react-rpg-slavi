import {useState, useEffect} from 'react';

const GetMapFilenames = () => {
    const [mapFilenames, setMapFilenames] = useState([]);
    const dynamicMapFilenamesUrl = process.env.NODE_ENV === 'production' ? '/api/get-map-filenames' : 'http://localhost:3002/api/get-map-filenames';
        
    useEffect(() => {
        console.log(dynamicMapFilenamesUrl, 'dynamicMapFilenames in getMapFilenames Hook')
        fetch(dynamicMapFilenamesUrl, {
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
