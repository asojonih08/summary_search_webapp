"use client";
import Link from "next/link";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import LibraryIcon from "./LibraryIcon";
import { usePathname } from "next/navigation";

export default function MobileNavigation() {
  const pathname = usePathname();
  return (
    <nav className="fixed px-2 bottom-0 left-0 right-0 flex items-center w-full mobile-navigation-height dark:bg-offsetDark border-t dark:border-borderMain/50 dark:ring-borderMain/50 dark:divide-borderMain/50 shadow-md">
      <div className="h-14 w-full items-center flex justify-center gap-x-16 dark:text-textOffDark">
        <Link
          className="active:scale-95 active:duration-150 active:ease-in-out relative"
          href="/"
        >
          <div
            className={`${
              pathname === "/" ? "dark:text-textMainDark" : ""
            } flex flex-col items-center gap-1.5  text-sm font-medium w-44  transition-all duration-300 ease-in-out`}
          >
            {pathname === "/" && (
              <div
                className="w-full absolute -top-2 left-0 right-0 mx-auto h-[3px] rounded-b-sm bg-textMain dark:bg-textMainDark"
                style={{
                  transform: "none",
                  transformOrigin: "50% 50% 0px",
                  opacity: 1,
                }}
              ></div>
            )}
            <RiSearch2Line className="w-[18.5px] h-[18.5px]" />
            <span>Home</span>
          </div>
        </Link>
        <Link href="/library">
          <div
            className={`${
              pathname === "/library" ? "dark:text-textMainDark" : ""
            } flex flex-col items-center gap-1.5 text-sm font-medium w-44 relative`}
          >
            {pathname === "/library" && (
              <div
                className="w-full transition-transform duration-300 delay-75 absolute -top-2 left-0 right-0 mx-auto h-[3px] rounded-b-sm bg-textMain dark:bg-textMainDark"
                style={{
                  transform: "none",
                  transformOrigin: "50% 50% 0px",
                  opacity: 1,
                }}
              ></div>
            )}
            <LibraryIcon className={`w-[18.5px] h-[18.5px]`} />
            <span>Library</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
