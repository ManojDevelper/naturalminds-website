import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Commingsoon.scss";

function Commingsoon() {
  const data = useStaticQuery(graphql`
  query {
     commingsoon: file(relativePath: {eq: "commingsoon.md"}) {
        id
        childMarkdownRemark {
          frontmatter {
              title
            commingsoon {
              id
              title
              imageid
              content
              contant2
              logo {
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
      <div className="commingsoon">
        <h1>{data.commingsoon.childMarkdownRemark.frontmatter.title}</h1>
        <div className="commingsoon_container">
          {data.commingsoon.childMarkdownRemark.frontmatter.commingsoon.map(commingsoon =>
            <div className="commingsoon_cards">
              <div className="commingsoon_cards_img_container">
                <img src={commingsoon.logo.childImageSharp.fluid.src} alt="img1" id="cs_img" />
              </div>
              <div className="commingsoon_cards_content">
                <div className="commingsoon_cards_content_matter">
                  <h2>{commingsoon.title}</h2>
                  <p>{commingsoon.content}</p>
                  <h3>{commingsoon.contant2}</h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Commingsoon;