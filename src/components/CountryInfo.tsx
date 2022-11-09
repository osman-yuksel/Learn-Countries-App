import { useEffect, useState } from "react";
import { fetchCountryData } from "./CountryData";
import { useSelectedCountry } from "./SelectedCountryContext";
import { z } from "zod";

function CountryInfo() {
  //zod Schema
  const countrySchema = z.object({
    name: z.object({
      common: z.string(),
      official: z.string(),
      nativeName: z.any(),
    }),
    independent: z.boolean(),
    unMember: z.boolean(),
    currencies: z.any(),
    capital: z.array(z.string()),
    languages: z.any(),
    population: z.number(),
    flags: z.object({ png: z.string(), svg: z.string() }),
    altSpellings: z.array(z.string()),
  });
  type CountryInfo = z.infer<typeof countrySchema>;

  const { country, setCountry } = useSelectedCountry();
  const [info, setInfo] = useState<CountryInfo | undefined>(undefined);

  async function FetchData(code: string) {
    const data: any = await fetchData(country);
    console.log("DATA: ", data);
    switch (code) {
      case "IR": //Iran
        setInfo(data[1]);
        break;
      case "NE": //Niger
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

  //info validation
  useEffect(() => {
    if (info) {
      console.log("info: ", info);
      const data = countrySchema.safeParse(info);
      if (!data.success) {
        console.log(data.error.issues);
        setInfo(undefined);
      }
    }
  }, [info]);

  return (
    <div className="border border-red-600">
      {info ? (
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
      ) : country ? (
        <div>Error!</div>
      ) : (
        <div>Select a country</div>
      )}
    </div>
  );
}

export default CountryInfo;

async function fetchData(code: string) {
  const data = await fetchCountryData(code);
  return data;
}
