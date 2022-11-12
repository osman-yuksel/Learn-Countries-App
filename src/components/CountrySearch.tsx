import React, { useState } from "react";
import { CountryNameData, Country } from "./CountryData";
import { useSelectedCountry } from "./SelectedCountryContext";

function CountrySearch(props: { DestroyMapHandler: Function }) {
  const [query, setQuery] = useState<string>("");
  const countryData = CountryNameData(); //All codes and names
  const [validCountries, setValidCountries] = useState<
    Array<{ country: Country; index: number }>
  >([]);
  const { country, setCountry } = useSelectedCountry();

  function OnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setValidCountries(SearchCountries(e.target.value, countryData));
  }

  return (
    <div className="group m-2 flex flex-col rounded-md pr-1 shadow-md shadow-gray-400 dark:text-white dark:shadow-gray-900">
      <div className="ml-3 border-b-2 border-slate-800/60 dark:border-slate-100/60">
        <h2 className="font-bold">Search</h2>
      </div>
      <div className="mb-4 ml-3 mt-1 flex h-10 w-64 flex-row items-center overflow-hidden rounded-md bg-gray-300 shadow-sm shadow-gray-300 transition-all dark:bg-[#313336] dark:shadow-gray-900">
        <div className="h-8 w-8">
          <img
            width={"100%"}
            height={"100%"}
            src="icons8-search.svg"
            alt="Search icon."
          />
        </div>
        <input
          className="mr-2 w-52 rounded-sm border-b-2 border-slate-800/60 bg-gray-300 !outline-none  transition-all focus:border-blue-500 dark:border-slate-100/60 dark:bg-[#313336] dark:focus:border-blue-400"
          placeholder="Name"
          onChange={OnChangeInput}
          value={query}
        />
        {query && (
          <ul
            className="absolute top-[10.8rem] z-20 inline-block 
        max-h-44 w-64 cursor-pointer overflow-x-auto rounded-md bg-gray-400/20 backdrop-blur-sm dark:bg-[#313336]/40 dark:backdrop-blur-md md:top-[5.2rem]"
          >
            {validCountries.map((item, key) => {
              return (
                <li
                  key={key}
                  className="m-1 border-b-2 border-black p-1 transition-all hover:cursor-pointer hover:rounded-md hover:bg-black hover:text-white"
                  onClick={() => {
                    setCountry(item.country.code);
                    setQuery("");
                    props.DestroyMapHandler();
                  }}
                >
                  {item.country.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CountrySearch;

type CountryQuery = {
  country: Country;
  index: number;
};

function SearchCountries(
  name: string,
  data: Array<Country>
): Array<CountryQuery> {
  const validCountries = [] as Array<CountryQuery>;
  let index: number = -1;
  data.forEach((item: Country) => {
    index = item.name.toLowerCase().search(name.toLowerCase());
    if (index !== -1) {
      validCountries.push({ country: item, index });
    }
  });
  return validCountries.sort(Sort);
}

//sorting by alphabetical order
function Sort(a: CountryQuery, b: CountryQuery) {
  return a.index - b.index;
}
