"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LogoIcon from "@/components/LogoIcon";
import { RiSearch2Line } from "react-icons/ri";
import LibraryIcon from "./LibraryIcon";
import Logo from "@/components/Logo";
import CloseSidebarIcon from "./CloseSidebarIcon";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebarOpen } from "./SidebarOpenContext";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import { signOutUser } from "@/actions/supabase/signOutUser";
import { AvatarImage } from "./ui/avatar";
import { User } from "@supabase/supabase-js";

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
interface SidebarProps {
  user: User | null;
}
export default function Sidebar({ user }: SidebarProps) {
  const { isOpen, setIsOpen } = useSidebarOpen();
  const pathname = usePathname();

  console.log("User: ", user);

  function handleSignOut() {
    const signOut = async () => {
      await signOutUser();
    };
    signOut();
  }

  return (
    <motion.nav
      animate={isOpen ? "open" : "close"}
      variants={containerVariants}
      className={`${
        isOpen ? "" : ""
      } z-50 min-w-[90px] min-h-screen h-full py-4 pb-16 dark:bg-mainBackgroundDark flex flex-col justify-between items-center`}
    >
      <div className="sticky top-4 flex flex-col gap-24 w-full items-center">
        <div
          className={`${
            isOpen
              ? "justify-between pl-4 pr-2.5"
              : "justify-center hover:scale-105"
          } flex items-center w-full h-auto cursor-pointer duration-300 transition-all hover:subpixel-antialiased`}
        >
          {isOpen ? (
            <Link href={"/"}>
              <Logo />
            </Link>
          ) : (
            <Link href={"/"}>
              <LogoIcon className="w-11 h-11" />
            </Link>
          )}
          {isOpen && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="group rounded-full dark:hover:bg-offsetPlusDark h-8 w-8 flex justify-center items-center duration-300 ease-out"
                  >
                    <CloseSidebarIcon className=" dark:group-hover:text-textMainDark h-[15px] w-[15px] dark:text-textOffDark" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="dark:bg-offsetPlusDark cursor-default px-2.5 py-1 rounded-sm">
                  <p className="text-xs text-[#E8E8E6]">Collapse</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-1.5 w-full">
          <div
            className={`${pathname === "/" ? "" : "pr-1"} ${
              isOpen ? "pr-1" : ""
            } w-full pl-1 relative`}
          >
            <TooltipProvider delayDuration={150}>
              <Tooltip open={isOpen ? false : undefined}>
                <TooltipTrigger className="flex justify-center items-center w-full">
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
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={pathname === "/" ? 4 : 9}
                  className="dark:bg-offsetPlusDark cursor-default px-2.5 py-1 rounded-sm"
                >
                  <p className="text-xs text-[#E8E8E6]">Search</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {pathname === "/" && !isOpen && (
              <div className="w-[3px] absolute right-0 top-0 h-10 bg-white rounded-l-sm" />
            )}
          </div>

          <div
            className={`${pathname === "/library" ? "" : "pr-1"} ${
              isOpen ? "pr-1" : ""
            } w-full pl-1 relative`}
          >
            <TooltipProvider delayDuration={150}>
              <Tooltip open={isOpen ? false : undefined}>
                <TooltipTrigger className="flex justify-center items-center w-full">
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
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={pathname === "/library" ? 4 : 9}
                  className="dark:bg-offsetPlusDark cursor-default px-2.5 py-1 rounded-sm"
                >
                  <p className="text-xs text-[#E8E8E6]">Library</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {pathname === "/library" && !isOpen && (
              <div className="w-[3px] absolute right-0 top-0 h-10 bg-white rounded-l-sm" />
            )}
          </div>
        </div>
      </div>
      <div className="sticky bottom-16">
        {!isOpen && (
          <div className="flex flex-col items-center ">
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger>
                  <div
                    className="flex items-center justify-center dark:bg-offsetPlusDark dark:hover:bg-offsetPlusDark group rounded-full h-10 w-10 cursor-pointer"
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
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={6}
                  className="dark:bg-offsetPlusDark cursor-default px-2.5 py-1 rounded-sm"
                >
                  <p className="text-xs text-[#E8E8E6]">Expand</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus-visible:outline-none">
                  <div className="border-t dark:border-borderMainDark/50 pt-2.5 mt-2.5 ">
                    <div className="w-10 h-10 rounded-full  md:dark:hover:bg-offsetPlusDark transition-all duration-200 flex items-center justify-center relative">
                      <Avatar className="w-[34px] h-[34px] dark:bg-offsetPlusDark rounded-full flex items-center justify-center">
                        {user.app_metadata.provider === "google" && (
                          <AvatarImage
                            className="rounded-full"
                            src={user.user_metadata.avatar_url}
                          />
                        )}
                        <AvatarFallback className={""}>
                          {" "}
                          <FaUser className="dark:text-textOffDark" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="dark:bg-mainBackgroundDark rounded-full flex items-center justify-center p-[2px] h-3.5 w-3.5 absolute bottom-0 -right-1">
                        <FaChevronDown className="text-textOffDark/50 h-2.5 w-2.5" />
                      </div>
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  sideOffset={-14}
                  className="w-[220px] dark:text-textMainDark rounded-md duration-150 p-2 dark:divide-borderMainDark/50 dark:ring-borderMainDark/50 dark:border-borderMainDark/50 dark:bg-backgroundDark"
                >
                  <DropdownMenuItem className="cursor-pointer text-center h-10 flex items-center">
                    <FaUser /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer text-center h-10 flex items-center"
                  >
                    <LogOut /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        )}
      </div>
    </motion.nav>
  );
}
