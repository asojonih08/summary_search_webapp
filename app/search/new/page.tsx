"use client";
import SearchResults from "@/components/SearchResults";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="mx-12">
        <SearchResults />
      </div>
    </Suspense>
  );
}
