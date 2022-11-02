import WorldMapContainer from "./components/WorldMapContainer";
import { SelectedCountryProvider } from "./components/SelectedCountryContext";

function App() {
  return (
    <div className="App">
      <SelectedCountryProvider>
        <WorldMapContainer />
      </SelectedCountryProvider>
    </div>
  );
}

export default App;
