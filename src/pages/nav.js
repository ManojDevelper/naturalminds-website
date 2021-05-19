import React, { useState, useEffect } from 'react';
import "../styles/ham.scss"
import '../styles/Nav.scss'
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby"
import fb from "../images/navfb.svg";
import insta from "../images/navinsta.svg";
import twitter from "../images/navtwitter.svg";
import Navtube from "../images/navtube.svg";
import ham1 from "../images/ham.svg";
import close from "../data/assets/close.svg";

function Top() {

  useEffect(() => {
    window.addEventListener('resize', showButton);

    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('resize', showButton);

      window.removeEventListener('scroll', changeBackground);
    }
  }, [])


  const [navbar, setNavbar] = useState(false);
  const [button, setButton] = useState();
  const data = useStaticQuery(graphql`
      query {
        nav: file(relativePath: {eq: "nav.md"}) {
          id
          childMarkdownRemark {
            frontmatter {
              navbar {
                link
                page_link
              }
              nav_logo {
                childImageSharp {
                  fluid(quality: 1) {
                    src
                  }
                }
              }
              navigation_button
              navigation_button_link
            }
          }
        } 
        }
    `)
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  useEffect(() => {
    showButton();
    // eslint-disable-next-line
  }, [])

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setNavbar(true)
    } else {
      setNavbar(false);
    }
  };

  return (
    <>
      <div id={navbar ? 'nav_main_div' : 'nav_main_div2'}>
        <div className="nav-co">
          <Navbar expand="xl" collapseOnSelect={true} className="Navbar">
            <div id="nav_img">
              <Link to="/landing"><img src={data.nav.childMarkdownRemark.frontmatter.nav_logo.childImageSharp.fluid.src} alt="img1" /></Link>
            </div>
            <Navbar.Toggle className="toggle">
              <div id="toggle" aria-controls="navbarResponsive" className="ntbtn">
              <img src={ham1} alt="img"/>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarResponsive" className="navbarResponsive">
            <Navbar.Toggle id="toggle2">
              <div id="toggle" aria-controls="navbarResponsive" className="ntbtn">
              <img src={close} alt="img"/>
              </div>
            </Navbar.Toggle>
              <Nav id="nav_items">
                <p id="navbtn2"><Nav.Link href="/landing" id="navlinks" activeclassname="nav_active">HOME</Nav.Link></p>
                <p id="navbtn2"><Nav.Link href="/landing/#about" id="navlinks" activeclassname="nav_active">ABOUT</Nav.Link></p>
                <p id="navbtn2"><Nav.Link href="/landing/#ourproducts" id="navlinks" activeclassname="nav_active">PRODUCTS</Nav.Link></p>
                <p id="navbtn2"><Nav.Link href="/doctor" id="navlinks" activeclassname="nav_active">FIND DOCTOR</Nav.Link></p>
                <p id="navbtn2"><Nav.Link href="/landing/#contact" id="navlinks" activeclassname="nav_active">CONTACT US</Nav.Link></p>
                <Link to="/register" id="reglink"><button activeclassname="nav_active2" className="navbtn1">REGISTER</button></Link>
                <a href="https://www.spotcare.in/auth/login" target="_blank" without rel="noreferrer" id="reglink"><button activeclassname="nav_active2" className="navbtn2">LOGIN</button></a>
                <div id="nav_icons">
                <div id="nav_icon_cont">
                  <a href="https://www.facebook.com/NaturalMindsInd/" target="_blank" rel="noopener noreferrer"><img src={fb} alt="img" /></a>
                </div>
                <div id="nav_icon_cont">
                  <a href="https://www.instagram.com/naturalminds_in/?hl=en" target="_blank" rel="noopener noreferrer"><img src={insta} alt="img" /></a>
                </div>
                <div id="nav_icon_cont">
                  <a href="https://twitter.com/naturalminds_in" target="_blank" rel="noopener noreferrer"><img src={twitter} alt="img" /></a>
                </div>
                <div id="nav_icon_cont">
                  <a href="https://www.youtube.com/channel/UCHpL9doEkIptF7BkPctpyvw" target="_blank" rel="noopener noreferrer"><img src={Navtube} alt="img" /></a>
                </div>
              </div>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </>
  );
};
export default Top;
