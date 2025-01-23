"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import LogoIcon from "@/components/LogoIcon";
import { RiSearch2Line } from "react-icons/ri";
import LibraryIcon from "./LibraryIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import CloseSidebarIcon from "./CloseSidebarIcon";

const containerVariants = {
  close: {
    width: "90px",
    transition: {
      type: "easeInOut",
      duration: 0.3,
    },
  },
  open: {
    width: "220px",
    minWidth: "220px",
    transition: {
      type: "easeInOut",
      duration: 0.3,
    },
  },
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.nav
      animate={isOpen ? "open" : "close"}
      variants={containerVariants}
      className={`${
        isOpen ? "" : ""
      } min-h-[100vh] min-w-[90px] h-full py-4 pb-32 dark:bg-mainBackgroundDark flex flex-col justify-between items-center`}
    >
      <div className="flex flex-col gap-24 w-full items-center">
        <div
          className={`${
            isOpen
              ? "justify-between pl-4 pr-2.5"
              : "justify-center hover:scale-105"
          } flex items-center w-full h-auto cursor-pointer duration-300 transition-all hover:subpixel-antialiased`}
        >
          {isOpen ? <Logo /> : <LogoIcon className="w-11 h-11" />}
          {isOpen && (
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="group rounded-full dark:hover:bg-offsetPlusDark h-8 w-8 flex justify-center items-center duration-300 ease-out"
            >
              <CloseSidebarIcon className=" dark:group-hover:text-textMainDark h-[16px] w-[16px] dark:text-textOffDark" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-1.5  w-full">
          <div
            className={`${pathname === "/" ? "" : "pr-1"} ${
              isOpen ? "pr-1" : ""
            } w-full pl-1 relative`}
          >
            <Link
              className={`${
                isOpen ? "justify-start pl-4" : "justify-center"
              } group dark:hover:bg-offsetPlusDark w-full h-10 py-2 flex gap-1.5 items-center rounded-md transition-all duration-300 ease-out`}
              href={"/"}
            >
              <RiSearch2Line
                className={`${
                  pathname === "/"
                    ? "dark:text-textMainDark"
                    : "dark:text-textOffDark"
                } ${
                  isOpen ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]"
                } dark:group-hover:text-textMainDark`}
              />
              {isOpen && (
                <p
                  className={`${
                    pathname === "/"
                      ? "dark:text-textMainDark"
                      : "dark:text-textOffDark"
                  } dark:group-hover:text-textMainDark font-medium`}
                >
                  Home
                </p>
              )}
            </Link>
            {pathname === "/" && !isOpen && (
              <div className="w-[3px] absolute right-0 top-0 h-10 bg-white rounded-l-sm" />
            )}
          </div>
          <div
            className={`${pathname === "/library" ? "" : "pr-1"} ${
              isOpen ? "pr-1" : ""
            } w-full pl-1 relative`}
          >
            <Link
              className={`${
                isOpen ? "justify-start pl-4" : "justify-center"
              } group dark:hover:bg-offsetPlusDark w-full h-10 py-2 flex gap-1.5 items-center rounded-md transition-all duration-300 ease-out`}
              href={"/library"}
            >
              <LibraryIcon
                className={`${
                  pathname === "/library"
                    ? "dark:text-textMainDark"
                    : "dark:text-textOffDark"
                } ${
                  isOpen ? "h-[18px] w-[18px]" : "h-[22px] w-[22px]"
                } dark:group-hover:text-textMainDark`}
              />
              {isOpen && (
                <p
                  className={`${
                    pathname === "/library"
                      ? "dark:text-textMainDark"
                      : "dark:text-textOffDark"
                  } dark:group-hover:text-textMainDark font-medium`}
                >
                  Library
                </p>
              )}
            </Link>
            {pathname === "/library" && !isOpen && (
              <div className="w-[3px] absolute right-0 top-0 h-10 bg-white rounded-l-sm" />
            )}
          </div>
        </div>
      </div>
      {/* <Button
        variant={"ghost"}
        className="dark:bg-offsetPlusDark dark:hover:bg-offsetPlusDark group rounded-full h-10 w-10 p-0"
        onClick={() => setIsOpen(!isOpen)}
      > */}

      {!isOpen && (
        <div
          className="flex items-center justify-center dark:bg-offsetPlusDark dark:hover:bg-offsetPlusDark group rounded-full h-10 w-10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="dark:text-textMainDark dark:stroke-textMainDark group-hover:dark:text-textOffDark transition-all duration-150 ease-out h-[22px] w-[22px] flex items-center justify-center"
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="arrow-right-from-line"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M48 88c0-13.3-10.7-24-24-24S0 74.7 0 88L0 424c0 13.3 10.7 24 24 24s24-10.7 24-24L48 88zM440.4 273.5c4.8-4.5 7.6-10.9 7.6-17.5s-2.7-12.9-7.6-17.5l-136-128c-9.7-9.1-24.8-8.6-33.9 1s-8.6 24.8 1 33.9L363.5 232 280 232l-128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l128 0 83.5 0-91.9 86.5c-9.7 9.1-10.1 24.3-1 33.9s24.3 10.1 33.9 1l136-128z"
            ></path>
          </svg>
        </div>
      )}
      {/* </Button> */}
    </motion.nav>
  );
}
