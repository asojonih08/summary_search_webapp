import SearchCard from "@/components/SearchCard";

export default function Home() {
  return (
    <div className="w-full min-h-full flex flex-col  items-center pt-[20vh]">
      <h3 className="dark:text-textMainDark text-4xl mb-10">
        What do you want to know?
      </h3>
      <SearchCard />
    </div>
  );
}
