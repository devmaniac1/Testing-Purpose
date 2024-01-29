import "./Map.css";
import MapContainer from "./MapContainer";
import { useState, useEffect, useRef } from "react";

function Map() {
  const column2Ref = useRef(null);
  const [column2Width, setColumn2Width] = useState(0);

  useEffect(() => {
    const currentWidth = column2Ref.current.offsetWidth;

    console.log("Column 2 Width:", currentWidth);

    setColumn2Width(currentWidth);
  }, []);

  return (
    <div className="main_map" ref={column2Ref}>
      <MapContainer width={column2Width} />
    </div>
  );
}

export default Map;
