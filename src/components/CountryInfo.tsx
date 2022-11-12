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
    <div className="mb-4">
      {info ? (
        <div className="flex">
          <div className="flex flex-col w-2/4">
            <div className="border-b-2 border-b-black w-3/4 p-1">
              Common Name <div className="text-lg">{info.name.common}</div>
            </div>
            <div className="border-b-2 border-b-black w-3/4 p-1">
              Official Name <div className="text-lg">{info.name.official}</div>
            </div>
            <div className="border-b-2 border-b-black w-3/4 p-1">
              Capital <div className="text-lg">{info.capital[0]}</div>
            </div>
            <div className="border-b-2 border-b-black w-3/4 p-1">
              Population
              <div className="text-lg">
                {new Intl.NumberFormat("en-US").format(info.population)}
              </div>
            </div>
            <div className="border-b-2 border-b-black w-3/4 p-1">
              Independent
              <div className="text-lg">{info.independent ? "Yes" : "No"}</div>
            </div>
            <div className="border-b-2 border-b-black w-3/4 p-1">
              UN Member
              <div className="text-lg">{info.unMember ? "Yes" : "No"}</div>
            </div>
            <div className="border-b-2 border-b-black w-3/4 p-1">
              Languages
              <ul className="text-lg">
                {Object.values(info.languages).map((item: any, key: number) => {
                  return (
                    <li className="before:content-['-']" key={key}>
                      {" "}
                      {item}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="border-b-2 border-b-black w-3/4 p-1">
              Currencies
              <ul className="text-lg">
                {Object.values(info.currencies).map(
                  (item: any, key: number) => {
                    return (
                      <li className="before:content-['-']" key={key}>
                        {" "}
                        {item.symbol} {item.name}
                      </li>
                    );
                  }
                )}
              </ul>
            </div>
          </div>
          <div className="mr-2 w-2/4">
            Flag
            <img className="border border-black" src={info.flags.svg} />
            <div className="mt-4">
              <a
                className="border-b-2 p-2 border-black w-[11.7rem] hover:bg-black hover:text-white transition-all hover:rounded-sm hover:cursor-pointer"
                href={
                  "https://en.wikipedia.org/w/index.php?title=Special:Search&search=" +
                  info.name.common
                }
                target="_blank"
              >
                Learn more at Wikipedia
              </a>
            </div>
          </div>
        </div>
      ) : country ? (
        <div className="text-lg text-center">An unexpected error happened!</div>
      ) : (
        <div className="text-lg text-center">
          Please select a country for country info.
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
