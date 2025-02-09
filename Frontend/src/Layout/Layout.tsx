import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Header } from "../components/Header";



export function Layout() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
    <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    <ToastContainer />
    <Outlet />
    </>
    
  );
}
