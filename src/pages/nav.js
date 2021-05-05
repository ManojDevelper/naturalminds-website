import React, { useState, useEffect } from 'react';
import "../styles/ham.scss"
import '../styles/Nav.scss'
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby"

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
                  fluid(quality: 10) {
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
  

  


  const [status, setStatus] = useState('close');
  return (
    <>
      <div id={navbar ? 'nav_main_div' : 'nav_main_div2'}>
        <div ClassName="nav-co">
          <Navbar expand="xl" collapseOnSelect={true} className="Navbar">
            <div id="nav_img">
              <Link to="/landing"><img src={data.nav.childMarkdownRemark.frontmatter.nav_logo.childImageSharp.fluid.src} alt="img1" /></Link>
            </div>
            <Navbar.Toggle className="toggle">
              <div id="toggle" aria-controls="navbarResponsive" className="ntbtn">
                <div className="BurgerMenu__container" role="presentation" onClick={() => setStatus(status === 'open' ? 'close' : 'open')}>
                  <i id="toggle_i" className={status}></i>
                  <i id="toggle_i" className={status}></i>
                </div>
              </div>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarResponsive" className="navbarResponsive">
              <Navbar.Toggle className="toggle">
                <div id="toggle" aria-controls="navbarResponsive" className="ntbtn">
                  <div className="BurgerMenu__container" role="presentation" onClick={() => setStatus(status === 'open' ? 'close' : 'open')}>
                    <i id="toggle_i" className={status}></i>
                    <i id="toggle_i" className={status}></i>
                  </div>
                </div>
              </Navbar.Toggle>
              <Nav id="nav_items">
                <Link to="/landing" id="navbtn2" activeclassname="nav_active">HOME</Link>
                <Link to="/landing/#about" id="navbtn2" activeclassname="nav_active">ABOUT</Link>
                <Link to="/landing/#ourproducts" id="navbtn2" activeclassname="nav_active">PRODUCTS</Link>
                <Link to="/doctor" id="navbtn2" activeclassname="nav_active">FIND DOCTOR</Link>
                <Link to="/landing/#contact" id="navbtn2" activeclassname="nav_active">CONTACT US</Link>
                <Link to="/login"><button activeclassname="nav_active2" className="navbtn1">REGISTER</button></Link>
                <a href= "https://www.spotcare.in/auth/login" target="_blank" without rel="noreferrer"><button activeclassname="nav_active2" className="navbtn2">LOGIN</button></a>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
    </>
  );
};
export default Top;
