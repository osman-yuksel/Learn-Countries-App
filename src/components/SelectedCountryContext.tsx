import React,{ createContext, ReactNode, useContext, useState, useEffect } from "react";

type SelectedCountry = {
  country: string,
  setCountry: React.Dispatch<React.SetStateAction<string>>
}

const SelectedCountryContext = createContext<SelectedCountry>({} as SelectedCountry);

export const SelectedCountryProvider = ({ children }: { children: ReactNode }) => {
  const [country, setCountry] = useState<string>("");
  useEffect(() => { console.log("Provider", country) }, [country]);

  const values = { country, setCountry };
  return (
    <SelectedCountryContext.Provider value={ values }>
      { children }
    </SelectedCountryContext.Provider>
  )
}

export const useSelectedCountry = () => useContext(SelectedCountryContext);