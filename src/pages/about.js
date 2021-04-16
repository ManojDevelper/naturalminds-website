import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/About.scss";

function About() {
  const data = useStaticQuery(graphql`
    query {
      about: file(relativePath: {eq: "about.md"}) {
          id
          childMarkdownRemark {
            frontmatter {
                title1
                title2
                content
            }
          }
        }   
       }
  `)
  return (
    <>
      <div id="about">
        <div id="about_conatiner_matter">
          <h1>{data.about.childMarkdownRemark.frontmatter.title1} <span style={{ color: `#1481BA` }}>{data.about.childMarkdownRemark.frontmatter.title2}</span></h1>
          <p>{data.about.childMarkdownRemark.frontmatter.content}</p>
        </div>
      </div>
    </>
  )
}
export default About;