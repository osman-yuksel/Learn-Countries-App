import WorldMap from "./WorldMap";
import CountrySearch from "./CountrySearch";
import SettingsMenu from "./SettingsMenu";
import CountryInfo from "./CountryInfo";
import { useState } from "react";

function WorldMapContainer() {
  const [destroyMap, setDestroyMap] = useState<boolean>(false);

  function DestroyMapHandler() {
    setDestroyMap(true);
    setTimeout(() => {
      setDestroyMap(false);
    }, 0); //little delay for recreation of the map
  }

  //Map does not support refocus, so recreating it is necessary
  return (
    <div>
      <div className="ml-4 mr-4 flex flex-col-reverse justify-between md:flex-row">
        <CountrySearch DestroyMapHandler={DestroyMapHandler} />
        <SettingsMenu />
      </div>
      <div className="flex flex-col">
        <div className="border-t-2 border-b-2">
          {destroyMap ? (
            <div className="empty w-auto h-[50vh]" />
          ) : (
            <WorldMap DestroyMapHandler={DestroyMapHandler} />
          )}
        </div>
        <CountryInfo />
      </div>
    </div>
  );
}

export default WorldMapContainer;
