import { useSettings } from "./SettingsContext";

function SettingsMenu() {
  const { settings, setSettings } = useSettings();
  const ToggleSetting = (setting: string) => {
    switch (setting) {
      case "darkMode":
        setSettings({
          darkMode: !settings.darkMode,
          selectedFocus: settings.selectedFocus,
          focusAnimation: settings.focusAnimation,
        });
        break;
      case "selectedFocus":
        setSettings({
          darkMode: settings.darkMode,
          selectedFocus: !settings.selectedFocus,
          focusAnimation: settings.focusAnimation,
        });
        break;
      case "focusAnimation":
        setSettings({
          darkMode: settings.darkMode,
          selectedFocus: settings.selectedFocus,
          focusAnimation: !settings.focusAnimation,
        });
        break;
      default:
        break;
    }
  };
  return (
    <div
      className={
        "border-2 border-red-600 m-4 " +
        (settings.darkMode ? "" : "bg-white text-black")
      }
    >
      <div>
        Dark Mode
        <button onClick={() => ToggleSetting("darkMode")}>
          {settings.darkMode.toString()}
        </button>
      </div>
      <div>
        Country Focus
        <button onClick={() => ToggleSetting("selectedFocus")}>
          {settings.selectedFocus.toString()}
        </button>
      </div>
      <div>
        Focus Animation
        <button onClick={() => ToggleSetting("focusAnimation")}>
          {settings.focusAnimation.toString()}
        </button>
      </div>
    </div>
  );
}

export default SettingsMenu;
