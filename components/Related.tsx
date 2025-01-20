import React from "react";
import RelatedSearches from "./RelatedSearches";

export default function Related() {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2">
        {/* <PiCirclesFourBold className="dark:text-textMainDark h-[17px] w-[17px] rotate-45" /> */}
        <svg
          className="text-textMainDark h-[17px] w-[17px]"
          aria-hidden="true"
          focusable="false"
          data-prefix="fak"
          data-icon="new-thread"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M467.2 115.2H313.6v51.2H467.2V115.2zm25.6 153.6H262.4V320H492.8V268.8zM262.4 115.2H32v51.2H262.4V115.2zm0 102.4H32v51.2H262.4V217.6zm0 102.4H32v51.2H262.4V320zm230.4 51.2H262.4v51.2H492.8V371.2zM416 64H364.8V217.6H416V64z"
          ></path>
        </svg>
        <h4 className="font-medium text-lg dark:text-textMainDark">Related</h4>
      </span>
      <RelatedSearches />
    </div>
  );
}
