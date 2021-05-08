import React from 'react';
import Banner from "./banner";
import Status from "./status";
import Patner from "./patner";
import Cards from "./cards";
import Commingsoon from "./commingsoon";
import Finddoctors from "./finddoctors";
import About from "./about"
import Coreteam from "./coreteam";
import Ourcustomers from "./ourcustomers"
import Patners from "./patners"
import Contact from "./contact";
import Footer from "./footer";
import "../styles/index.scss";

const Landing = () => {
  return (
    <>
      <Banner />
      <Status />
      <Patner />
      <Cards />
      <Commingsoon />
      <Finddoctors />
      <About />
      <Coreteam />
      <Ourcustomers />
      <Patners />
      <Contact />
      <Footer />
    </>
  )
}
export default Landing;