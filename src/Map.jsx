import React, { useState, useEffect, setState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Loading from "./Loading";
import icon from "./images/champagne.png";

// https://react-google-maps-api-docs.netlify.app/#
export default function Map(props) {
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
  const mapStyle = {styles: [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#202c3e"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.39"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.96"
            },
            {
                "saturation": "9"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": "9"
            },
            {
                "color": "#29446b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#193a55"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
  ]}
  return (
    <div className="mapcontainer row justify-content-center">
    <GoogleMap
          mapContainerStyle={{ maxWidth: "1600px", height: "1200px" }} 
          zoom={13}
          center={mapCenter}
          options={mapStyle}
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
                    <div className="info-text">
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
        </div>
      );
}
