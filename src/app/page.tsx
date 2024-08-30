"use client";

import Card from "./country/page";
import { useState, useEffect } from "react";

export default function Home() {
  const [country, SetCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [countryData, setCountryData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);

    const fetchCountries = async () => {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await res.json();
      setCountryData(data);
      setLoading(false);
    };

    fetchCountries();
  }, []);

  if (!countryData) return <div>Loading...</div>;
  return (
    <main className="flex flex-col min-h-full pb-xl max-w-screen-xl m-auto px-screen">
      <div className="relative items-center justify-start flex">
        <label>
          {" "}
          <input
            className="w-full max-w-[320px] my-xl py-md px-screen border-none rounded bg-white dark:bg-blue placeholder:text-darkBlueText dark:placeholder:text-white shadow-md"
            placeholder="Search for a country..."
            name="searchCountry"
            value={country}
            onChange={(e) => SetCountry(e.target.value)}
          ></input>
        </label>

        <img
          src="/icon-search.svg"
          alt="Search Icon"
          className="absolute ml-3 w-6 !fill-lightGray dark:fill-white"
        ></img>
      </div>

      <div className="grid gap-12 m-auto grid-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[320px] md:max-w-full">
        {countryData.map((post: any, i: number) => {
          return (
            <Card
              key={i}
              flag={post.flags.svg}
              flagAlt={post.flags.alt}
              name={post.name.common}
              population={post.population}
              region={post.region}
              capital={post.capital}
            />
          );
        })}
      </div>
    </main>
  );
}
