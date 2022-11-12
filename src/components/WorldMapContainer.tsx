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
      <h1 className="ml-9 mb-4 mt-2 text-4xl select-none w-72 hidden border-b border-gray-900 dark:text-white dark:border-slate-100/60">
        Learn Countries
      </h1>
      <div className="ml-4 mr-4 flex flex-col-reverse justify-between md:flex-row">
        <CountrySearch DestroyMapHandler={DestroyMapHandler} />
        <SettingsMenu />
      </div>
      <div className="flex flex-col">
        <div className="border-t border-b dark:border-black">
          {destroyMap ? (
            <div className="empty h-[50vh] w-auto" />
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
