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
          focusAnimation: settings.focusAnimation && !settings.selectedFocus,
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
    <div className="m-2">
      <h4 className="border-b-2 border-slate-800/60 ml-1 font-bold">Settings</h4>
      <div
        className={
          "overflow-hidden border-opacity-70 flex "
        }
      >
        <div className="h-10 bg-slate-800/60 rounded-lg w-[.2rem] ml-1 mt-2"></div>
        <div className="mr-2 ml-1">
          Dark Mode
          <div
            className="cursor-pointer select-none"
            onClick={() => ToggleSetting("darkMode")}
          >
            <div
              className={
                "w-12 h-6 border-2 rounded-xl " +
                (settings.darkMode
                  ? "bg-[#33b249] border-[#33b249]"
                  : "border-gray-400/70 bg-gray-200")
              }
            >
              <div
                className={
                  "w-5 h-5 transition-all rounded-xl bg-white " +
                  (settings.darkMode ? "translate-x-6" : "")
                }
              ></div>
            </div>
          </div>
        </div>
        <div className="h-10 bg-slate-800/60 rounded-lg w-[.2rem] ml-1 mt-2"></div>
        <div className="mr-2 ml-1">
          Country Focus
          <div
            className="cursor-pointer select-none"
            onClick={() => ToggleSetting("selectedFocus")}
          >
            <div
              className={
                "w-12 h-6 border-2 rounded-xl " +
                (settings.selectedFocus
                  ? "bg-[#33b249] border-[#33b249]"
                  : settings.darkMode
                  ? "border-gray-700/70 bg-gray-600"
                  : "border-gray-400/70 bg-gray-200")
              }
            >
              <div
                className={
                  "w-5 h-5 transition-all rounded-xl bg-white " +
                  (settings.selectedFocus ? "translate-x-6 " : "")
                }
              ></div>
            </div>
          </div>
        </div>
        <div className="h-10 bg-slate-800/60 rounded-lg w-[.2rem] ml-1 mt-2"></div>
        <div className="mr-2 ml-1">
          Focus Animation
          <div
            className="cursor-pointer select-none"
            onClick={() => ToggleSetting("focusAnimation")}
          >
            <div
              className={
                "w-12 h-6 border-2 rounded-xl " +
                (settings.focusAnimation
                  ? "bg-[#33b249] border-[#33b249]"
                  : settings.darkMode
                  ? "border-gray-700/70 bg-gray-600"
                  : "border-gray-400/70 bg-gray-200")
              }
            >
              <div
                className={
                  "w-5 h-5 transition-all rounded-xl bg-white " +
                  (settings.focusAnimation ? "translate-x-6" : "")
                }
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
