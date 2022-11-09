import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type Settings = {
  settings: SettingsData;
  setSettings: React.Dispatch<React.SetStateAction<SettingsData>>;
};

type SettingsData = {
  darkMode: boolean;
  selectedFocus: boolean;
  focusAnimation: boolean;
};

const SettingsContext = createContext<Settings>({} as Settings);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  if (!localStorage.getItem("settings")) {
    localStorage.setItem(
      "settings",
      JSON.stringify({
        darkMode: true,
        selectedFocus: true,
        focusAnimation: true,
      })
    );
  }

  const localSettings = localStorage.getItem("settings");

  const [settings, setSettings] = useState<SettingsData>(
    (localSettings ? JSON.parse(localSettings) : null) as SettingsData
  );
  useEffect(() => {
    console.log("Provider", settings);
    localStorage.setItem(
      "settings",
      JSON.stringify({
        darkMode: settings.darkMode,
        selectedFocus: settings.selectedFocus,
        focusAnimation: settings.focusAnimation,
      })
    );
  }, [settings]);

  const values = { settings, setSettings };
  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
