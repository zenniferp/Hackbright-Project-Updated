import React, { useState, Fragment} from "react"
import { useHistory } from "react-router-dom"
import Map from "./Map"


export default function Search(props) {

// Return state value and updating function
// First you wouldn't have any value so pass an empty string

    const [street, updateStreet] = useState("")
    const [city, updateCity] = useState("")
    const [state, updateState] = useState("")
    const [radius, updateRadius] = useState("")

    const [results, updateResults] = useState([])

// Redirect to a map view
    let history = useHistory();
    const [showMap, updateShowMap] = useState(false)

// Get data from the backend
    const handleSubmit = (evt) => {
        evt.preventDefault();
        const data = {street, city, state, radius}

// Parse the data from the Yelp API/server as json.
        fetch('api/search', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        ).then(response => response.json())
        .then(data => {updateResults(data)})
        .then(() => updateShowMap(true))
    }

// Show Form
// Pass the user input (evt target value) and update state
    return (
        <Fragment>
            <div className="search bg-transparent text-center py-5">
                <p className="small-title"> Search for a rooftop bar near you! </p>
                <form onSubmit = {handleSubmit}>                 
                    <input
                        type="text"
                        value={street}
                        name="street"
                        placeholder="street"
                        onChange={evt => updateStreet(evt.target.value)} required={true} />
                    <input
                        type="text"
                        value={city}
                        name="city"
                        placeholder="city"
                        onChange={evt => updateCity(evt.target.value)} required={true} />
                    <input
                        type="text"
                        value={state}
                        name="state"
                        placeholder="state"
                        onChange={evt => updateState(evt.target.value)} required={true} />
                    <input
                        type="number"
                        value={radius}
                        name="radius"
                        placeholder="within how many miles?"
                        onChange={evt => updateRadius(evt.target.value)} required={true} />
                    <button type="submit" class="btn btn-outline-warning">Search</button>
                </form>
            </div>
            {showMap && <Map results={results} updateResults={updateResults}/>}
        </Fragment>
    );
}

