import { Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
import Nav from "./Nav";
import Home from "../Home";
import Footer from "./Footer";


const Layout = () =>{
    return (
        <main className="App">
            <Outlet />
            <Header />
            <Home />
            <Footer year={new Date().getFullYear()} />
          

        </main>
    )
}
export default Layout