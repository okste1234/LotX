"use client"

import { configureWeb3Modal } from "@/utils/connection/connect";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export const AppProvider = ({ children }:any) => {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "" : ""));
  };

  configureWeb3Modal();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="">
        
        <div className="">{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};
