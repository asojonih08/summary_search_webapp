"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SourceFocusContextProps {
  sourceFocusSelection: string;
  setSourceFocusSelection: (sourceFocusSelection: string) => void;
}

const SourceFocusContext = createContext<SourceFocusContextProps | undefined>(
  undefined
);

interface SourceFocusProviderProps {
  children: ReactNode;
}

export const SourceFocusProvider: React.FC<SourceFocusProviderProps> = ({
  children,
}) => {
  const [sourceFocusSelection, setSourceFocusSelection] =
    useState<string>("Web");

  return (
    <SourceFocusContext.Provider
      value={{ sourceFocusSelection, setSourceFocusSelection }}
    >
      {children}
    </SourceFocusContext.Provider>
  );
};

export const useSourceFocus = (): SourceFocusContextProps => {
  const context = useContext(SourceFocusContext);
  if (!context) {
    throw new Error("useSourceFocus must be used within a SourceFocusProvider");
  }
  return context;
};
