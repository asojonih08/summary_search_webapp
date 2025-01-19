import SearchResults from "@/components/SearchResults";
import React from "react";

export default function page({ params }: any) {
  const search_query = params.q;
  return (
    <div className="mx-12">
      <SearchResults />
    </div>
  );
}
