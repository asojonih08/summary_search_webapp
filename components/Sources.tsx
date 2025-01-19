import React from "react";
import { PiCirclesFourBold } from "react-icons/pi";
import SourceCard from "./SourceCard";

export default function Sources() {
  return (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2">
        <PiCirclesFourBold className="dark:text-textMainDark h-[17px] w-[17px] rotate-45" />
        <h4 className="font-medium text-lg dark:text-textMainDark">Sources</h4>
      </span>
      <div className="flex gap-2.5">
        {[1, 2, 3, 4].map((val, index) => (
          <SourceCard
            variant={index === 3 ? "multiple sources" : "regular"}
            key={index}
            title={""}
            image={""}
            source={""}
          />
        ))}
      </div>
    </div>
  );
}
