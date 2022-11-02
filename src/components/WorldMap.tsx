import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.css";
import { useEffect, useState } from "react";
import { useSelectedCountry } from "./SelectedCountryContext";

function WorldMap(props: { DestroyMapHandler: Function }) {
  const { country, setCountry } = useSelectedCountry();
  //Initiate world map
  useEffect(() => {
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
    document.querySelectorAll(".jvm-region")
    .forEach((item) => {
      item.addEventListener("click", (e: any) => {
        // console.log(e.target);
        setCountry(e.target.dataset.code);
        // Destroying map for recreation.
        map.destroy();
        props.DestroyMapHandler();
      })
    })
  }, [])

  return (
    <div id="map" 
      style={{ width: "1200px", height: "600px" }} 
    />
  )
}

export default WorldMap;
