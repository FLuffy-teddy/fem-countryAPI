export default function Loading() {
  return (
    <div className="grid gap-12 m-auto grid-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[320px] md:max-w-full mt-xl mx-xl">
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="block md:flex justify-start flex-col rounded border-solid transition-all align-center no-underline bg-white dark:bg-blue shadow-md"
        >
          <div className="flex flex-col rounded w-full items-start pb-sm md:pb-md">
            <div className="relative w-full h-[240px]"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
