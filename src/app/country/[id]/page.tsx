import Link from "next/link";
import Image from "next/image";

async function getCountry(countryId: string) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryId}`, {
    next: { revalidate: 10 },
  });
  const data = await res.json();
  return data;
}
async function getBorderCountries(borderString: string[]) {
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${borderString}`,
    {
      next: { revalidate: 10 },
    }
  );
  const data = await res.json();
  return data;
}

export default async function CountryPage({ params }: any) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const country = await getCountry(params.id);
  const languageArray: any = Object.values(country[0].languages);
  const currencyObject: any = Object.values(country[0].currencies);
  const borderCountries = await getBorderCountries(country[0].borders);

  const countryPop = numberWithCommas(country[0].population);
  return (
    <div className="flex flex-col min-h-full pb-xl max-w-screen-xl m-auto px-screen text-black dark:text-white">
      <Link
        href="/"
        className="w-fit max-w-fit my-xl py-sm px-xl lg:px-screen border-none rounded bg-white dark:bg-blue dark:text-white shadow-md flex hover:ring hover:bg-blue dark:hover:bg-white hover:text-white dark:hover:text-black"
      >
        <Image
          className=""
          width={20}
          height={20}
          src="/arrow-back.svg"
          alt="Back Arrow"
        />
        <p>Back</p>
      </Link>
      <div className="grid grid-auto-fr lg:grid-cols-2 grid-cols-1">
        <div className="relative w-full lg:w-11/12 lg:h-auto h-[400px] m-auto">
          <Image
            height={0}
            width={0}
            src={country[0].flags.svg}
            alt={country[0].flagAlt}
            className="absolute h-full w-full flex object-cover rounded"
          />
        </div>
        <div className="w-full lg:w-11/12 m-auto flex flex-col py-xxl">
          <h2 className="py-md text-2xl font-bold">{country[0].name.common}</h2>
          <div className="grid grid-auto-fr grid-cols-2">
            <div className="relative w-11/12 h-auto mr-auto">
              <h3 className="font-lg py-xxs text-black dark:text-white">
                Native Name:{" "}
                <span className="text-slate-700 dark:text-lightGray opacity-60">
                  {country[0].name.common}
                </span>
              </h3>
              <h3 className="font-lg py-xxs text-black dark:text-white">
                Population:{" "}
                <span className="text-slate-700 dark:text-lightGray opacity-60">
                  {countryPop}
                </span>
              </h3>
              <h3 className="font-lg py-xxs text-black dark:text-white">
                Region:{" "}
                <span className="text-slate-700 dark:text-lightGray opacity-60">
                  {country[0].region}
                </span>
              </h3>
              <h3 className="font-lg py-xxs text-black dark:text-white">
                Sub Region:{" "}
                <span className="text-slate-700 dark:text-lightGray opacity-60">
                  {country[0].subregion}
                </span>
              </h3>
              <h3 className="font-lg py-xxs text-black dark:text-white">
                Capital:{" "}
                <span className="text-slate-700 dark:text-lightGray opacity-60">
                  {country[0].capital}
                </span>
              </h3>
            </div>
            <div className="w-full ml-auto flex flex-col py-xxl">
              <h2 className="font-lg py-xxs">
                Top Level Domain:{" "}
                <span className="text-slate-700 dark:text-lightGray opacity-60">
                  {country[0].tld[0]}
                </span>
              </h2>
              <h2 className="font-lg py-xxs">
                Currencies:{" "}
                <span className="text-slate-700 dark:text-lightGray opacity-60">
                  {currencyObject[0].name}
                </span>
              </h2>
              <h2 className="font-lg py-xxs">
                Languages:
                <span>
                  {languageArray.map((item: string, i: number) => {
                    return (
                      <span
                        className="text-slate-700 dark:text-lightGray opacity-60"
                        key={i}
                      >
                        {item}
                        {i > 1 ? <span>, </span> : <span></span>}
                      </span>
                    );
                  })}
                </span>
              </h2>
            </div>
          </div>
          {country[0].borders ? (
            <div className="flex flex-wrap gap-x-2">
              <h3 className="flex items-center">Border Countries: </h3>
              {country[0].borders.map((border: string, i: number) => {
                return (
                  <Link
                    href={`/country/${borderCountries[i].name.common}`}
                    className="my-md"
                    key={i}
                  >
                    <span className="max-w-fit my-md py-sm px-xl border-none rounded bg-white dark:bg-blue placeholder:text-darkBlueText dark:placeholder:text-black dark:text-white">
                      {borderCountries[i].name.common}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
