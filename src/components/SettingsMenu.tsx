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
        <div
          className="border border-red-600 cursor-pointer select-none"
          onClick={() => ToggleSetting("darkMode")}
        >
          {settings.darkMode.toString()}
          <div className="w-16 h-6 border-2 rounded-xl border-blue-600">
            <div
              className={
                "w-5 h-5 transition-all border-2 rounded-xl " +
                (settings.darkMode ? "border-green-700 translate-x-10" : "")
              }
            ></div>
          </div>
        </div>
      </div>
      <div>
        Country Focus
        <div
          className="border border-red-600 cursor-pointer select-none"
          onClick={() => ToggleSetting("selectedFocus")}
        >
          {settings.selectedFocus.toString()}
          <div className="w-16 h-6 border-2 rounded-xl border-blue-600">
            <div
              className={
                "w-5 h-5 transition-all border-2 rounded-xl " +
                (settings.selectedFocus ? "border-green-700 translate-x-10" : "")
              }
            ></div>
          </div>
        </div>
      </div>
      <div>
        Focus Animation
        <div
          className="border border-red-600 cursor-pointer select-none"
          onClick={() => ToggleSetting("focusAnimation")}
        >
          {settings.focusAnimation.toString()}
          <div className="w-16 h-6 border-2 rounded-xl border-blue-600">
            <div
              className={
                "w-5 h-5 transition-all border-2 rounded-xl " +
                (settings.focusAnimation ? "border-green-700 translate-x-10" : "")
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
