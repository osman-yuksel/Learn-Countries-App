import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import "jsvectormap/dist/css/jsvectormap.css";
import { useEffect, useState } from "react";
import { useSelectedCountry } from "./SelectedCountryContext";
import { useSettings } from "./SettingsContext";

function WorldMap(props: { DestroyMapHandler: Function }) {
  const { country, setCountry } = useSelectedCountry();
  const { settings, setSettings } = useSettings();

  useEffect(() => {
    console.debug("map mounted");

    //Initiate world map
    const map = new jsVectorMap({
      selector: "#map",
      map: "world",
      ...(settings.selectedFocus && {
        focusOn: {
          region: country,
          animate: settings.focusAnimation,
        },
      }),
      regionStyle: {
        selected: { fill: "red" },
        selectedHover: { fill: "purple" },
      },
      selectedRegions: [country],
    });

    //Create event listeners for countries
    const mapRegions = document.querySelectorAll(".jvm-region");
    mapRegions.forEach((item) => {
      item.addEventListener("click", (e: any) => {
        setCountry(e.target.dataset.code);
        props.DestroyMapHandler();
      });
      item.addEventListener("touchstart", (e: any) => {
        setCountry(e.target.dataset.code);
        props.DestroyMapHandler();
      });
    });

    return () => {
      map.destroy();
      console.debug("map unmounted");
    };
  }, []);

  return (
    <div className="w-auto h-[50vh] flex justify-center">
      <div id="map" style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

export default WorldMap;
