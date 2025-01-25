"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SourcesOpenContextProps {
  sourcesOpen: boolean;
  setSourcesOpen: (sourcesOpen: boolean) => void;
}

const SourcesOpenContext = createContext<SourcesOpenContextProps | undefined>(
  undefined
);

interface SourcesOpenProviderProps {
  children: ReactNode;
}

export const SourcesOpenProvider: React.FC<SourcesOpenProviderProps> = ({
  children,
}) => {
  const [sourcesOpen, setSourcesOpen] = useState<boolean>(false);

  return (
    <SourcesOpenContext.Provider value={{ sourcesOpen, setSourcesOpen }}>
      {children}
    </SourcesOpenContext.Provider>
  );
};

export const useSourcesOpen = (): SourcesOpenContextProps => {
  const context = useContext(SourcesOpenContext);
  if (!context) {
    throw new Error("useSourcesOpen must be used within a SourcesOpenProvider");
  }
  return context;
};
