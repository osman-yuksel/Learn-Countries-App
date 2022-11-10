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
      <div className="ml-3 border-b-2">
        <h2>Search</h2>
      </div>
      <div className="m-4 ml-3 mt-1 w-64 h-10 border-2 border-gray-900/60 rounded-lg overflow-hidden flex flex-row items-center transition-all">
        <div className="w-9 h-8">
          <img
            width={"100%"}
            height={"100%"}
            src="../../public/icons8-search.svg"
          />
        </div>
        <input
          className="mr-2 w-52 border-b-2 text-2xl border-white focus:border-blue-600 !outline-none rounded-sm  transition-all"
          placeholder="?"
          onChange={OnChangeInput}
        />
        {query && (
          <ul
            className="overflow-x-auto max-h-32 absolute inline-block 
        mt-44 border-2 rounded-xl w-64 border-gray-900/60 cursor-pointer z-10"
          >
            {validCountries.map((item, key) => {
              return (
                <li
                  key={key}
                  className="border-2 rounded-md border-red-400 m-1"
                  onClick={() => {
                    setCountry(item.country.code);
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
