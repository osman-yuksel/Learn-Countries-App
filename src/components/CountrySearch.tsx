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
    <div className="m-4 w-64 border border-red-500 flex flex-col">
      <input
        className="w-full border-2 border-blue-600"
        placeholder="?"
        onChange={OnChangeInput}
      />
      {query && (
        <ul
          className="overflow-x-auto max-h-14 absolute inline-block 
        mt-10 border-2 z-2 border-blue-600 cursor-pointer z-10"
        >
          {validCountries.map((item, key) => {
            return (
              <li
                key={key}
                className="border-2 border-red-400 m-1"
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
  );
}

export default CountrySearch;

type CountryQuery = {
  country: Country;
  index: number;
};

function SearchCountries(name: string, data: Array<Country>): Array<CountryQuery> {
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
