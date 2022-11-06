import WorldMapContainer from "./components/WorldMapContainer";
import { SelectedCountryProvider } from "./components/SelectedCountryContext";
import { SettingsProvider } from "./components/SettingsContext";

function App() {
  return (
    <div className="App">
      <SettingsProvider>
        <SelectedCountryProvider>
          <WorldMapContainer />
        </SelectedCountryProvider>
      </SettingsProvider>
    </div>
  );
}

export default App;
