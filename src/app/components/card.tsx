import Image from "next/image";
import Link from "next/link";

type Props = Readonly<{
  flag: string;
  flagAlt: string;
  name: string;
  population: number;
  region: string;
  capital: string;
}>;

export default function Card({
  flag,
  flagAlt,
  name,
  population,
  region,
  capital,
}: Props) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const countryPop = numberWithCommas(population);
  return (
    <Link
      className="block md:flex justify-start flex-col rounded border-solid transition-all align-center no-underline bg-white dark:bg-blue shadow-md"
      href={`/country/${name}`}
      rel="noopener noreferrer"
      // target="_blank"
    >
      <div className="flex flex-col rounded w-full items-start pb-sm md:pb-md">
        <div className="relative w-full h-[138px]">
          <Image
            height={0}
            width={0}
            src={flag}
            alt={flagAlt}
            className="absolute h-full w-full flex object-cover rounded"
          />
        </div>
        <div className="px-lg w-full">
          {" "}
          <h2 className="text-xl my-md font-bold">{name}</h2>
          <p className="m-0 text-md ">
            Population:{" "}
            <span className="m-0 opacity-60 text-md font-light">
              {countryPop}
            </span>
          </p>
          <p className="m-0 text-md">
            Region:{" "}
            <span className="m-0 opacity-60 text-md font-light">{region}</span>
          </p>
          <p className="m-0 text-md ">
            Capital:{" "}
            <span className="m-0 opacity-60 text-md font-light">{capital}</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
