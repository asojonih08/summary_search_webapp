import MobileHeader from "@/components/MobileHeader";
import SearchCard from "@/components/SearchCard";

export default function Home() {
  return (
    <div className="w-full min-h-full flex flex-col md:pt-[20vh] pt-[12vh] md:px-0 px-4">
      <div className="md:hidden block">
        <MobileHeader />
      </div>
      <SearchCard />
    </div>
  );
}
