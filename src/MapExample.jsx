import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import Loading from "./Loading";
import icon from "./images/champagne.png";

// https://react-google-maps-api-docs.netlify.app/#
export default function MapExample(props) {
  const [mapData, setMapData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAjpErE26dDxvQMnZS8I-cUOGjz6WW3rik", // ,
    // ...otherOptions
  });
  console.log(props.results);
  // console.log(mapData);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/search")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMapData(data);
  //       setLoading(false);
  //     });
  // }, []);

// alias: "rooftop-25-san-francisco-2"
// categories: (3) [{…}, {…}, {…}]
// coordinates: {latitude: 37.77851, longitude: -122.39432}
// display_phone: "(415) 495-5875"
// distance: 1981.0400188061883
// favorited: false
// id: "QHEvjDuIQc7ebYpEaB_TjA"
// image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/iX_wct_bfl2jOHNAUP70sg/o.jpg"
// is_closed: false
// location: {address1: "25 Lusk St", address2: "", address3: null, city: "San Francisco", country: "US", …}
// name: "Rooftop 25"
// phone: "+14154955875"
// price: "$$"
// rating: 4
// review_count: 193
// transactions: ["restaurant_reservation"]
// url: "https://www.yelp.com/biz/rooftop-25-san-francisco-2?adjust_creative=jL6p_NnsB9Qcc0b9TM8bmw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=jL6p_NnsB9Qcc0b9TM8bmw"
// __proto__: Object

// center={{ lat: props.results[0].coordinates.latitude, lng: props.results[0].coordinates.longitude }} 


  if (loading || !isLoaded) {
    return <Loading />;
  }
  return (
    <GoogleMap
          center={{ lat: 37.7749, lng: -122.4194 }} 
          mapContainerStyle={{ width: "400px", height: "400px" }} 
          zoom={5}
        >
          {props.results.map((dataPoint) => (
            <Marker
              key={dataPoint.id}
              position={{ lat: dataPoint.coordinates.latitude, lng: dataPoint.coordinates.longitude }}
              icon={icon}
            />
            //info window; import above
          ))}
        </GoogleMap>
      );
}
