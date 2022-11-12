import WorldMapContainer from "./components/WorldMapContainer";
import MobileDevice from "./components/MobileDevice";
import { SelectedCountryProvider } from "./components/SelectedCountryContext";
import { useSettings } from "./components/SettingsContext";

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

  const { settings, setSettings } = useSettings();

  return (
    <div className={"" + (settings.darkMode ? "dark" : "")}>
      <div className="App dark:bg-gradient-radial flex min-h-screen justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-gray-400 to-gray-600 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black">
        <div className="mt-2 dark:invert">
          <div className="mt-2 w-16">
            <img
              className="w-16 transition-all hover:scale-105 hover:invert dark:hover:invert-0"
              src="icons8-geography-64.png"
              alt="Geographic World icon."
            />
          </div>
          <div className="group mt-4 flex w-16 justify-center transition-all hover:scale-105 hover:invert dark:hover:invert-0">
            <a
              className="w-10 group-hover:scale-105"
              href="https://github.com/osman-yuksel/Learn-Countries-App"
              target={"_blank"}
            >
              <img src="GitHub-Mark-64px.png" alt="Github logo" />
            </a>
          </div>
        </div>
        <div className="w-10/12 overflow-hidden border-l border-r font-[Barlow] dark:border-black">
          <SelectedCountryProvider>
            <WorldMapContainer />
          </SelectedCountryProvider>
        </div>
      </div>
    </div>
  );
}

export default App;
