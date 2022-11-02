import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.css";
import { useEffect, useState } from "react";
import { useSelectedCountry } from "./SelectedCountryContext";

function WorldMap(props: { DestroyMapHandler: Function }) {
  const { country, setCountry } = useSelectedCountry();

  useEffect(() => {
    console.debug("map mounted");
    
    //Initiate world map
    const map = new jsVectorMap({
      selector: "#map",
      map: "world",
      focusOn: {
        region: country,
        animate: true,
      },
      regionStyle: {
        selected: { fill: 'red' },
        selectedHover: { fill: 'purple' }
      },
      selectedRegions: [country],
    });

    //Create event listeners for countries
    const mapRegions = document.querySelectorAll(".jvm-region");
    mapRegions.forEach((item) => {
      item.addEventListener("click", (e: any) => {
        setCountry(e.target.dataset.code);
        props.DestroyMapHandler();
      })
    })
    
    return () => { map.destroy(); console.debug("map unmounted"); }
  }, [])

  return (
    <div id="map" 
      style={{ width: "1200px", height: "600px" }} 
    />
  )
}

export default WorldMap;
