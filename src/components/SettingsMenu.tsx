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
    <div className="m-2 group flex flex-col rounded-md pr-1 shadow-md shadow-gray-400 dark:text-white dark:shadow-gray-900">
      <h4 className="ml-1 border-b-2 border-slate-800/60 font-bold dark:border-slate-100/60 dark:text-white">
        Settings
      </h4>
      <div className="flex overflow-hidden dark:text-white">
        <div className="mr-2 ml-1">
          Dark Mode
          <div
            className="cursor-pointer select-none"
            onClick={() => ToggleSetting("darkMode")}
          >
            <div
              className={
                "h-6 w-12 rounded-xl border-2 " +
                (settings.darkMode
                  ? "border-[#33b249] bg-[#33b249]"
                  : "border-gray-200 bg-gray-200")
              }
            >
              <div
                className={
                  "h-5 w-5 rounded-xl bg-white transition-all dark:translate-x-6"
                }
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-2 h-10 w-[.1rem] rounded-lg bg-slate-800/60 dark:bg-slate-100/60"></div>
        <div className="mr-2 ml-2">
          Country Focus
          <div
            className="cursor-pointer select-none"
            onClick={() => ToggleSetting("selectedFocus")}
          >
            <div
              className={
                "h-6 w-12 rounded-xl border-2 " +
                (settings.selectedFocus
                  ? "border-[#33b249] bg-[#33b249] "
                  : "border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-600")
              }
            >
              <div
                className={
                  "h-5 w-5 rounded-xl bg-white transition-all " +
                  (settings.selectedFocus ? "translate-x-6 " : "")
                }
              ></div>
            </div>
          </div>
        </div>
        <div className="mt-2 h-10 w-[.1rem] rounded-lg bg-slate-800/60 dark:bg-slate-100/60"></div>
        <div className="mr-2 ml-2">
          Focus Animation
          <div
            className="cursor-pointer select-none"
            onClick={() => ToggleSetting("focusAnimation")}
          >
            <div
              className={
                "h-6 w-12 rounded-xl border-2 " +
                (settings.focusAnimation
                  ? "border-[#33b249] bg-[#33b249]"
                  : "border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-600")
              }
            >
              <div
                className={
                  "h-5 w-5 rounded-xl bg-white transition-all " +
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
