import React, { useState, Fragment} from "react"
import { useHistory } from "react-router-dom"
import Map from "./Map"


export default function ShowFavorites(props) {

    const [results, updateResults] = useState([])

    let history = useHistory();

// Only do this on the initial page load hence empty array at the end
    React.useEffect(() => {
        fetch('api/getallfavorites')
        .then(response => response.json())
        .then(data => {updateResults(data)})
    }, []);

    return (
            <div className="map-container mb-3 py-5" >
            <Map results={results} updateResults={updateResults}/>
            </div>
    );
}