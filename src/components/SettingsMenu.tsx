import { useSettings } from "./SettingsContext";

function SettingsMenu() {
  const { settings, setSettings } = useSettings();
  const SettingsToggleButton = (setting: string) => {
    switch (setting) {
      case "darkMode":
        setSettings({
          darkMode: !settings.darkMode,
          selectedFocus: settings.selectedFocus,
          focusAnimation: settings.focusAnimation
        })
        break;
      case "selectedFocus":
        setSettings({
          darkMode: settings.darkMode,
          selectedFocus: !settings.selectedFocus,
          focusAnimation: settings.focusAnimation
        })
        break;
      case "focusAnimation":
        setSettings({
          darkMode: settings.darkMode,
          selectedFocus: settings.selectedFocus,
          focusAnimation: !settings.focusAnimation
        })
        break;
      default:
        break;
    }
  }
  console.log(settings)
  return (
    <div className={"border-2 border-red-600 m-4 " + (settings.darkMode ? "bg-white text-black" : "")}
    >
      <div>
        Dark Mode
        <button onClick={() => SettingsToggleButton("darkMode")}>
          { settings.darkMode.toString() }
        </button>
      </div>
      <div>
        Country Focus 
        <button onClick={() => SettingsToggleButton("selectedFocus")}>
          { settings.selectedFocus.toString() }
        </button>
      </div>
      <div>
        Focus Animation  
        <button onClick={() => SettingsToggleButton("focusAnimation")}>
          { settings.focusAnimation.toString() }
        </button>
      </div>
    </div>
  );
}

export default SettingsMenu;

const SettingsToggleButton = (setting: string) => {

}