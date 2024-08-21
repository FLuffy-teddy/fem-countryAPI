import Card from "./country/page";
import Image from "next/image";

export default async function Home() {
  const data = await getData();
  // console.log(data);
  return (
    <main className="flex flex-col min-h-full pb-xl max-w-screen-xl m-auto px-screen">
      <div className="relative items-center justify-start flex">
        {" "}
        <input
          className="w-1/3 max-w-[320px] my-xl py-md px-screen border-none rounded bg-white dark:bg-blue placeholder:text-darkBlueText dark:placeholder:text-white"
          placeholder="Search for a country..."
        ></input>
        <img
          src="/icon-search.svg"
          alt="Search Icon"
          className="absolute ml-3 w-6 !fill-lightGray dark:fill-white"
        ></img>
        {/* <Image
          height={12}
          width={12}
          src="/icon-search.svg"
          alt="Search Icon"
          className="absolute ml-3 w-6 fill-lightGray dark:fill-white"
        /> */}
      </div>

      <div className="grid gap-12 m-auto grid-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[320px] md:max-w-full">
        {data.map((post: any, i: number) => {
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

async function getData() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
