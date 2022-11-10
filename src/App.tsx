import WorldMapContainer from "./components/WorldMapContainer";
import MobileDevice from "./components/MobileDevice";
import { SelectedCountryProvider } from "./components/SelectedCountryContext";
import { SettingsProvider } from "./components/SettingsContext";

function App() {
  var hasTouchScreen = false;

  var UA = navigator.userAgent;
          hasTouchScreen = (
              /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
              /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
          ); 

  if (hasTouchScreen) {
      return <div className="App">
        <MobileDevice />
      </div>
  }

  return (
    <div className="App flex justify-center">
      <div className="w-10/12 overflow-hidden border border-gray-900/40">
      <SettingsProvider>
        <SelectedCountryProvider>
          <WorldMapContainer />
        </SelectedCountryProvider>
      </SettingsProvider>
      </div>
    </div>
  );
}

export default App;
