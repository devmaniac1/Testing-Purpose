import React, { useRef, useState } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

const center = { lat: 48.8584, lng: 2.2945 };

function MapContainer({
  fromLocation,
  toLocation,
  width,
  travelMode,
  setMap,
  calculateRoute,
  directionsResponse,
}) {
  // const { isLoaded } = useJsApiLoader({
  //   googleMapsApiKey: "AIzaSyBkePZHNAeceiSPlP4LuZIPd28NpBJcaF8",
  //   libraries: ["places"],
  // });
  // const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  // const [directionsResponse, setDirectionsResponse] = useState(null);

  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const originRef = useRef();
  // /** @type React.MutableRefObject<HTMLInputElement> */
  // const destiantionRef = useRef();
  // if (!isLoaded) {
  //   return <div>Loading</div>;
  // }

  // async function calculateRoute() {
  //   if (fromLocation === "" || toLocation === "") {
  //     return;
  //   }
  //   console.log(fromLocation, toLocation);
  //   let mode = "";
  //   mode =
  //     travelMode === "bus" || travelMode === "train"
  //       ? // eslint-disable-next-line no-undef
  //         google.maps.TravelMode.TRANSIT
  //       : // eslint-disable-next-line no-undef
  //         google.maps.TravelMode.DRIVING;
  //   // eslint-disable-next-line no-undef
  //   const directionsService = new google.maps.DirectionsService();
  //   const results = await directionsService.route({
  //     origin: fromLocation,
  //     destination: toLocation,
  //     // eslint-disable-next-line no-undef
  //     travelMode: mode,
  //   });
  //   setDirectionsResponse(results);
  //   console.log(results);
  //   // setDistance(results.routes[0].legs[0].distance.text);
  //   // setDuration(results.routes[0].legs[0].duration.text);
  // }

  // function clearRoute() {
  //   setDirectionsResponse(null);
  //   // setDistance("");
  //   // setDuration("");
  //   originRef.current.value = "";
  //   destiantionRef.current.value = "";
  // }
  // calculateRoute();

  return (
    <>
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          height: "100%",
          width: `${width}px`,
          borderRadius: "0rem",
          // backgroundColor: "hsl(0, 0, 0.7%)",
          // backgroundBlendMode: "overlay",
        }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => {
          setMap(map);
          calculateRoute();
        }}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </>
  );
}
export default MapContainer;
