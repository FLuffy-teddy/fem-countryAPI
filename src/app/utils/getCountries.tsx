export async function getCountries(countrySlug?: string) {
  if (typeof countrySlug !== "undefined") {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${countrySlug}`
    );
    const data = await res.json();
    if (!res.ok) {
      return "Error";
    }
    return data;
  } else {
    const res = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await res.json();
    return data;
  }
}
export default getCountries;
