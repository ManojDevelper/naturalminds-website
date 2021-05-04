import React from "react";
import "../styles/Patners.scss";
import { graphql, useStaticQuery } from "gatsby"

function Patners() {
  const data = useStaticQuery(graphql`
  query {
    ourpatners: file(relativePath: {eq: "patners.md"}) {
        id
        childMarkdownRemark {
          frontmatter {
              title
            ourpatners {
              id
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
  }
`)
  return (
    <>
      <div id="patners">
        <h1>{data.ourpatners.childMarkdownRemark.frontmatter.title}</h1>
        <div id="patner_container_main">
        <div id="patners_container">
          {data.ourpatners.childMarkdownRemark.frontmatter.ourpatners.map(ourpatners =>
            <div id="patners_image_card" key={ourpatners.id}>
              <div id="patners_image_container">
                <img src={ourpatners.image.childImageSharp.fluid.src} alt="img1" />
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </>
  );
};
export default Patners;