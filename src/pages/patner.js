import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Patner.scss";

function Patner() {
  const data = useStaticQuery(graphql`
  query {
     patner: file(relativePath: {eq: "patner.md"}) {
        id
        childMarkdownRemark {
          frontmatter {
              title
              title2
              image1 {
                childImageSharp {
                  fluid(quality: 30) {
                    src
                }
              }
            }
            image2 {
                childImageSharp {
                  fluid(quality: 1) {
                    src
                }
              }
            }
            image3 {
                childImageSharp {
                  fluid(quality: 1) {
                    src
                }
              }
            }
            image4 {
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
      <div className="patner">
        <div className="patner_container">
          <div className="patner_container_content1">
            <div className="conten1_title">
              <h1>{data.patner.childMarkdownRemark.frontmatter.title}</h1>
            </div>
            <div className="conten1_img">
              <img src={data.patner.childMarkdownRemark.frontmatter.image1.childImageSharp.fluid.src} alt="img1" id="overlapimg" />
            </div>
          </div>
          <div className="patner_container_conten2">
            <div className="conten1_title">
              <h1>{data.patner.childMarkdownRemark.frontmatter.title2}</h1>
            </div>
            <div className="conten1_img">
              <img src={data.patner.childMarkdownRemark.frontmatter.image2.childImageSharp.fluid.src} alt="img1" id="img"/>
              <img src={data.patner.childMarkdownRemark.frontmatter.image3.childImageSharp.fluid.src} alt="img1"  id="img"/>
              <img src={data.patner.childMarkdownRemark.frontmatter.image4.childImageSharp.fluid.src} alt="img1"  id="img"/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Patner;