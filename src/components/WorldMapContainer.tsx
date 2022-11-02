import WorldMap from "./WorldMap";
import { useState } from "react";

function WorldMapContainer() {
  const [destroyMap, setDestroyMap] = useState<boolean>(false);
  
  function DestroyMapHandler(){
    setDestroyMap(true); 
    setTimeout(() => { setDestroyMap(false); }, 0); //little delay for recreation of the map.
  }
  
  //Map does not support refocus, so recreating it is necessary.
  if (destroyMap) { 
    return (
      <div className="empty w-[1200px] h-[600px]"
      />
    )
  }

  return (
    <div>
      <WorldMap DestroyMapHandler={ DestroyMapHandler } />
      <button onClick={ DestroyMapHandler }>
        Destroy
      </button>
    </div>
  );
}

export default WorldMapContainer;

