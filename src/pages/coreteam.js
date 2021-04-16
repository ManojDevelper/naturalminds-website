import React from "react";
import arrow from "../data/assets/Arrow - Right.svg";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Coreteam.scss";


function Coreteam() {
  const data = useStaticQuery(graphql`
      query {
        coreteam: file(relativePath: {eq: "coreteam.md"}) {
            id
            childMarkdownRemark {
              frontmatter {
                title1
                title2
                coreteam{
                  name
                  designation
                  qualification1
                  qualification2
                  button
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
      <div className="coreteam">
        <div className="coreteam_container">
          <h1>{data.coreteam.childMarkdownRemark.frontmatter.title1} <span style={{ color: `#1481BA` }}>{data.coreteam.childMarkdownRemark.frontmatter.title2}</span></h1>
          <div id="coreteam_cards">
            {data.coreteam.childMarkdownRemark.frontmatter.coreteam.map(coreteam =>
              <div id="coreteam_card1">
                <div id="coreteam_card_svg">
                  <img src={coreteam.image.childImageSharp.fluid.src} alt="img1" id="coreteamimg1" />
                </div>
                <div id="coreteam_card_matter">
                  <div id="coreteam_card_matter_container">
                    <p id="coreteam_h1">{coreteam.name}</p>
                    <p id="coreteam_h2">{coreteam.designation}</p>
                    <p id="coreteam_h3">{coreteam.qualification1}</p>
                    <p id="coreteam_h3">{coreteam.qualification2}</p>
                    <button id="coreteam_button">{coreteam.button}<img src={arrow} alt="img1" id="cbutton_img" /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Coreteam;
