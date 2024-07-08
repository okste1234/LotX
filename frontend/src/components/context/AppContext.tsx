"use client"

import { configureWeb3Modal } from "@/utils/connection/connect";
import { createContext, useContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
        <ToastContainer />
      </div>
    </ThemeContext.Provider>
  );
};
