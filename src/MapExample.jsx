import React, { useState, useEffect, setState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Loading from "./Loading";
import icon from "./images/champagne.png";

// https://react-google-maps-api-docs.netlify.app/#
export default function MapExample(props) {
  const {updateResults} = props
  const [selectedCenter, setSelectedCenter] = useState(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAjpErE26dDxvQMnZS8I-cUOGjz6WW3rik"
  });

  if (!isLoaded) {
    return <Loading />;
  }

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15
  }

  function saveFav(dataPointId){
    const data = {result_id:dataPointId}
     fetch('/api/favorite', {
         method: "POST",
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
    })
  }
 
 function removeFav(dataPointId){
   const data = {result_id:dataPointId}
    fetch('/api/unfavorite', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
  })
 }

 function toggleFav(dataPointId, isFaved) {
  const updatedResults = [...props.results] // list slice, making a copy
  for (const updatedResult of updatedResults){
    if (updatedResult.id === dataPointId){
      updatedResult.favorited = !updatedResult.favorited //if true set to false, vice versa
      }
    }
  updateResults(updatedResults)
  if (isFaved) {
    removeFav(dataPointId);
    } else {
      saveFav(dataPointId);
    }
  }

  const mapCenter = props.results[0] ? { lat: props.results[0].coordinates.latitude, lng: props.results[0].coordinates.longitude }: { lat: 37.7749, lng: -122.4194 }

  return (
    <GoogleMap
          mapContainerStyle={{ maxWidth: "1200px", height: "800px" }} 
          zoom={13}
          center={mapCenter}
      >
          {props.results.map((dataPoint) => (
            <Marker
              key={dataPoint.id}
              position={{ lat: dataPoint.coordinates.latitude, lng: dataPoint.coordinates.longitude }}
              icon={icon}
              onClick={() => {
                setSelectedCenter(dataPoint);
             }}
            >
              {selectedCenter==dataPoint ? 
                <InfoWindow 
                  position={{ lat: dataPoint.coordinates.latitude, lng: dataPoint.coordinates.longitude }}
                  onCloseClick={() => {
                    setSelectedCenter(null);
                 }}
                >
                    <div>
                      <h1>{dataPoint.name}</h1>
                      <img src={dataPoint.image_url} width="300" height="300" ></img>
                      <ul className="bar-info">
                        <li><b>Address: </b>{dataPoint.location.display_address}</li>
                        <li><b>Rating: </b>{dataPoint.rating} stars</li>
                        <li><b><a href={dataPoint.url}>Yelp link</a></b></li>
                        <li><b><button onClick={ () => toggleFav(dataPoint.id, dataPoint.favorited)}>{dataPoint.favorited ? 'Unfav' : 'Fav'}</button></b></li>
                      </ul>
                    </div>
                </InfoWindow> : null}
            </Marker>
          ))};
        </GoogleMap>
      );
}
