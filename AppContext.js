import React, { createContext, useContext } from "react";

// Create the context
export const AppContext = createContext(undefined);

// Custom hook to access context
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
