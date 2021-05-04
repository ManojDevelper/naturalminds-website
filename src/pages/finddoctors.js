import React, { useEffect } from 'react';
import search from "../data/assets/search.svg";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Finddoctors.scss";
import Aos from "aos";
import { Link } from "gatsby";
import "aos/dist/aos.css";

function Finddoctors() {
  useEffect(() => {
    Aos.init();
  }, [])
  const data = useStaticQuery(graphql`
    query {
      finddoctors: file(relativePath: {eq: "finddoctor.md"}) {
          id
          childMarkdownRemark {
            frontmatter {
              title
              content
              search_content
              image {
                childImageSharp {
                  fluid(quality: 25) {
                    src
                  }
                }
              }
            }
          }
        }   
       }
  `)
  return (
    <>
      <div className="finddoctors" id="finddoctors" data-aos="fade-down">
        <div className="finddoctors_container">
          <div className="finddoctors_container_matter">
          <div id="finddoctors_container_matter_container">
            <h1 key="35">{data.finddoctors.childMarkdownRemark.frontmatter.title}</h1>
            <p key="36">{data.finddoctors.childMarkdownRemark.frontmatter.content}</p>
            <div id="search_bar">
              <img src={search} alt="img" className="searchicon" />
              <Link to="/doctor/"><input type="search" placeholder={data.finddoctors.childMarkdownRemark.frontmatter.search_content} className="search" key="37"/></Link>
            </div>
            </div>
          </div>
          <div id="finddocbannerimg">
          <div>
          <img src={data.finddoctors.childMarkdownRemark.frontmatter.image.childImageSharp.fluid.src} alt="img1" id="finddoctors_img" key="38"/>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Finddoctors;