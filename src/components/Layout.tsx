import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
