// In Layout.js
import React from "react";
import Navbar from "./components/Navbar"; // Assume you have this component
import Footer from "./components/Footer"; // Assume you have this component

const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default Layout;
