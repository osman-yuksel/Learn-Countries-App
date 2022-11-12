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
    <div className="group flex flex-col mt-2">
      <div className="ml-3 border-b-2 border-slate-800/60">
        <h2 className="font-bold">Search</h2>
      </div>
      <div className="mb-4 ml-3 mt-1 w-64 h-10 bg-gray-400/25 rounded-md overflow-hidden flex flex-row items-center transition-all">
        <div className="w-8 h-8">
          <img width={"100%"} height={"100%"} src="/icons8-search.svg" />
        </div>
        <input
          className="mr-2 w-52 border-b-2 bg-gray-200/20 border-gray-400 focus:border-blue-500  !outline-none rounded-sm  transition-all"
          placeholder="Name"
          onChange={OnChangeInput}
          value={query}
        />
        {query && (
          <ul
            className="overflow-x-auto max-h-44 absolute inline-block 
        top-[5.2rem] p-1 rounded-md w-64 bg-gray-400/20 backdrop-blur-sm drop-shadow-lg cursor-pointer z-10"
          >
            {validCountries.map((item, key) => {
              return (
                <li
                  key={key}
                  className="border-b-2 border-black m-1 p-1 hover:bg-black hover:text-white transition-all hover:rounded-md hover:cursor-pointer"
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
