import React, { useEffect, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = ({
  google,
  width,
  fromLocation,
  toLocation,
  toLatitude,
  toLongitude,
  fromLatitude,
  fromLongitude,
}) => {
  const [markers, setMarkers] = useState([]);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const from = {
      lat: fromLatitude,
      lng: fromLongitude,
    };
    const to = {
      lat: toLatitude,
      lng: toLongitude,
    };
    // const location1 = { lat: 6.9271, lng: 79.8612 };
    const location1 = from;
    const location2 = to;
    // const location2 = { lat: 7.8731, lng: 80.7718 };

    setMarkers([location1, location2]);

    setMapKey((prevKey) => prevKey + 1);
  }, [width]);

  return (
    <Map
      google={google}
      zoom={8}
      initialCenter={{ lat: 7.8731, lng: 80.7718 }}
      style={{ height: "85vh", width: `${width}px`, borderRadius: "1rem" }}
      key={mapKey}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker} title={`Location ${index + 1}`} />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8",
})(MapContainer);
