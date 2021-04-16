import React from "react";
import search from "../data/assets/search.svg";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Finddoctors.scss";

function Finddoctors() {
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
                  fluid(quality: 1) {
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
      <div className="finddoctors">
        <div className="finddoctors_container">
          <div className="finddoctors_container_matter">
            <h1>{data.finddoctors.childMarkdownRemark.frontmatter.title}</h1>
            <p>{data.finddoctors.childMarkdownRemark.frontmatter.content}</p>
            <div id="search_bar">
              <img src={search} alt="img" class="searchicon" />
              <input type="search" placeholder={data.finddoctors.childMarkdownRemark.frontmatter.search_content} className="search" />
            </div>
          </div>
          <img src={data.finddoctors.childMarkdownRemark.frontmatter.image.childImageSharp.fluid.src} alt="img1" id="finddoctors_img" />
        </div>
      </div>
    </>
  );
};
export default Finddoctors;