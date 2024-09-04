"use client";

import Card from "./components/card";
import { useState, useEffect } from "react";
import getCountries from "./utils/getCountries";
import Loading from "./components/mainPageLoading";

export default function Home() {
  const [countryData, setCountryData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState<string>("");

  function handleSearch(e: any) {
    const dataFilter = e?.target.value;
    if (dataFilter != "") {
      getCountries(dataFilter)
        .then((res) => {
          setCountryData(res);
        })
        .catch((err) => console.log("error " + err));
      setSearch(dataFilter);
    } else {
      getCountries()
        .then((res) => {
          setCountryData(res);
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    getCountries()
      .then((res) => {
        setCountryData(res);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }, []);

  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );
  if (!countryData) return <p>No profile data</p>;
  return (
    <main className="flex flex-col min-h-full pb-xl max-w-screen-xl m-auto px-screen">
      <div className="relative items-center justify-start flex">
        <label>
          {" "}
          <input
            className="w-full max-w-[320px] my-xl py-md px-screen border-none rounded bg-white dark:bg-blue placeholder:text-darkBlueText dark:placeholder:text-white shadow-md"
            placeholder="Search for a country..."
            name="searchCountry"
            onChange={handleSearch}
          />
        </label>

        <img
          src="/icon-search.svg"
          alt="Search Icon"
          className="absolute ml-3 w-6 !fill-lightGray dark:fill-white"
        ></img>
      </div>
      {countryData && (
        <div className="grid gap-12 m-auto grid-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[320px] md:max-w-full">
          {countryData?.map((post: any, i: number) => {
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
      )}
    </main>
  );
}
