import React, { useState } from 'react';
import "../styles/ham.scss"
import '../styles/Nav.scss'
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"

function Top() {
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
  const [status, setStatus] = useState('close');
  return (
    <>
      <div className="nav-co">
        <Navbar expand="xl" collapseOnSelect={true} className="Navbar">
          <div id="nav_img">
            <img src={data.nav.childMarkdownRemark.frontmatter.nav_logo.childImageSharp.fluid.src} alt="img1" />
          </div>
          <Navbar.Toggle className="toggle">
            <div id="toggle" aria-controls="navbarResponsive" class="ntbtn">
              <div className="BurgerMenu__container" role="presentation" onClick={() => setStatus(status === 'open' ? 'close' : 'open')}>
                <i id="toggle_i" className={status}></i>
                <i id="toggle_i" className={status}></i>
              </div>
            </div>
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarResponsive" className="navbarResponsive">
            <Navbar.Toggle className="toggle">
              <div id="toggle" aria-controls="navbarResponsive" class="ntbtn">
                <div className="BurgerMenu__container" role="presentation" onClick={() => setStatus(status === 'open' ? 'close' : 'open')}>
                  <i id="toggle_i" className={status}></i>
                  <i id="toggle_i" className={status}></i>
                </div>
              </div>
            </Navbar.Toggle>
            <Nav id="nav_items">
              {data.nav.childMarkdownRemark.frontmatter.navbar.map(navbar =>
                <Link to={navbar.page_link} id="navbtn2" activeClassName="nav_active">{navbar.link}</Link>
              )}
              <Link to={data.nav.childMarkdownRemark.frontmatter.navigation_button_link} ><button activeClassName="nav_active2" className="navbtn1">{data.nav.childMarkdownRemark.frontmatter.navigation_button}</button></Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};
export default Top;
