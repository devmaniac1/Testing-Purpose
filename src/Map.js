import "./Map.css";
import MapContainer from "./MapContainer";
import { useState, useEffect, useRef } from "react";

function Map({
  fromLocation,
  toLocation,
  travelMode,
  setMap,
  calculateRoute,
  directionsResponse,
}) {
  const column2Ref = useRef(null);
  const [column2Width, setColumn2Width] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const currentWidth = column2Ref.current.offsetWidth;
      console.log("Column 2 Width:", currentWidth);
      setColumn2Width(currentWidth);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };

    // const currentWidth = column2Ref.current.offsetWidth;

    // console.log("Column 2 Width:", currentWidth);

    // setColumn2Width(currentWidth);
  }, []);

  return (
    <div className="main_map" ref={column2Ref}>
      <MapContainer
        width={column2Width}
        fromLocation={fromLocation}
        toLocation={toLocation}
        travelMode={travelMode}
        setMap={setMap}
        calculateRoute={calculateRoute}
        directionsResponse={directionsResponse}
      />
    </div>
  );
}

export default Map;
