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
  if (destroyMap) {
    return <div className="empty w-[1200px] h-[600px]" />;
  }

  return (
    <div>
      <div className="flex flex-row">
        <CountrySearch DestroyMapHandler={DestroyMapHandler} />
        <SettingsMenu />
      </div>
      <WorldMap DestroyMapHandler={DestroyMapHandler} />
      <button onClick={DestroyMapHandler}>Destroy</button>
      <CountryInfo />
    </div>
  );
}

export default WorldMapContainer;
