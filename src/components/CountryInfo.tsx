import React, { useEffect, useState } from "react";
import { fetchCountryData } from "./CountryData";
import { useSelectedCountry } from "./SelectedCountryContext";

function CountryInfo() {
  const { country, setCountry } = useSelectedCountry();
  const [info, setInfo] = useState<any>(null);

  async function FetchData(code: string) {
    const data: any = await fetchData(country);
    console.log("DATA: ", data);
    switch (code) {
      case "IR":
        setInfo(data[1]);
        break;
      case "NE":
        setInfo(data[1]);
        break;
      default:
        setInfo(data[0]);
        break;
    }
  }

  useEffect(() => {
    if (country) {
      FetchData(country);
    }
  }, [country]);

  return (
    <div className="border border-red-600">
      {info && (
        <div>
          <div>Name: {info.name.common}</div>
          <div>Capital: {info.capital[0]}</div>
          <div>Population: {info.population}</div>
          <div>Independent: {info.independent.toString()}</div>
          <div>Languages: {Object.values(info.languages)}</div>
          <div>Currencies: {Object.keys(info.currencies)}</div>
          <div>
            Flag:
            <img src={info.flags.svg} />
          </div>
        </div>
      )}
    </div>
  );
}

export default CountryInfo;

async function fetchData(code: string) {
  const data = await fetchCountryData(code);
  return data;
}
