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
    switch (code) {
      case "IR": //Iran
        setInfo(data[1]);
        break;
      case "NE": //Niger
        setInfo(data[1]);
        break;
      case "CG": //Congo
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
    <div className="mb-4 dark:text-white">
      {info ? (
        <div>
          <div className="flex">
            <div className="flex w-2/4 flex-col">
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
                Common Name <div className="text-lg">{info.name.common}</div>
              </div>
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
                Official Name{" "}
                <div className="text-lg">{info.name.official}</div>
              </div>
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
                Capital <div className="text-lg">{info.capital[0]}</div>
              </div>
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
                Population
                <div className="text-lg">
                  {new Intl.NumberFormat("en-US").format(info.population)}
                </div>
              </div>
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
                Independent
                <div className="text-lg">{info.independent ? "Yes" : "No"}</div>
              </div>
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
                UN Member
                <div className="text-lg">{info.unMember ? "Yes" : "No"}</div>
              </div>
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
                Languages
                <ul className="text-lg">
                  {Object.values(info.languages).map(
                    (item: any, key: number) => {
                      return (
                        <li className="before:content-['-']" key={key}>
                          {" "}
                          {item}
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
              <div className="w-3/4 border-b-2 border-b-black p-1 pl-2 shadow-md shadow-gray-500 dark:border-[#2c3138] dark:shadow-gray-900">
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
              <a
                className="mt-2 ml-1 opacity-60"
                href="https://restcountries.com/"
              >
                Data are taken from <strong>restcountries.com</strong>
              </a>
            </div>
            <div className="mr-2 w-2/4">
              Flag
              <img
                className="border border-black shadow-md shadow-gray-600"
                src={info.flags.svg}
              />
              <div className="mt-4">
                <a
                  className="border-b-2 w-[11.7rem] border-black p-2 pl-0 pb-0 shadow-md shadow-gray-600 transition-all hover:cursor-pointer hover:rounded-sm hover:bg-black hover:text-white dark:border-[#2c3138] dark:shadow-gray-900 dark:hover:border-black sm:pl-2 sm:pb-2"
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
          <div className="mt-4 border-t border-t-gray-900/60 text-center">
            This app is not associated with Wikipedia or restcountries.com.
          </div>
          <div className="text-center underline">
            App icons by{" "}
            <a target="_blank" href="https://icons8.com">
              Icons8
            </a>
          </div>
        </div>
      ) : country ? (
        <div className="text-center text-lg">An unexpected error happened!</div>
      ) : (
        <div className="text-center text-lg">
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
