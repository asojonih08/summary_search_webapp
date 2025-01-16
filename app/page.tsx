import SearchCard from "@/components/SearchCard";

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center">
      <main>
        <div className="w-full right-0 left-0 mx-auto text-center">
          <h3 className="dark:text-textMainDark text-4xl mb-10">
            What do you want to know?
          </h3>
        </div>

        <SearchCard />
      </main>
    </div>
  );
}
