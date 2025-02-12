import SearchCard from "@/components/SearchCard";

export default function Home() {
  return (
    <div className="w-full min-h-full grow flex flex-col  items-center pt-[20vh] md:px-0 px-4">
      <h3 className="dark:text-textMainDark md:text-4xl text-3xl mb-10">
        What do you want to know?
      </h3>
      <SearchCard />
    </div>
  );
}
