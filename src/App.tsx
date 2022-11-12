import WorldMapContainer from "./components/WorldMapContainer";
import MobileDevice from "./components/MobileDevice";
import { SelectedCountryProvider } from "./components/SelectedCountryContext";
import { SettingsProvider } from "./components/SettingsContext";

function App() {
  let hasTouchScreen = false;

  let UA = navigator.userAgent;
  hasTouchScreen =
    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);

  if (hasTouchScreen) {
    return (
      <div className="App">
        <MobileDevice />
      </div>
    );
  }

  return (
    <div className="App flex justify-center">
      <div className="w-10/12 overflow-hidden font-[Barlow] border-l-2 border-r-2">
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
