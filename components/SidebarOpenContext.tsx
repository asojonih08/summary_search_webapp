"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface SidebarOpenContextProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SidebarOpenContext = createContext<SidebarOpenContextProps | undefined>(
  undefined
);

interface SidebarOpenProviderProps {
  children: ReactNode;
}

export const SidebarOpenProvider: React.FC<SidebarOpenProviderProps> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Load the initial state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarState");
    if (savedState !== null) {
      setIsOpen(JSON.parse(savedState));
    }
  }, []);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <SidebarOpenContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarOpenContext.Provider>
  );
};

export const useSidebarOpen = (): SidebarOpenContextProps => {
  const context = useContext(SidebarOpenContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarOpenProvider");
  }
  return context;
};
