import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Status.scss";

function Status() {
  const data = useStaticQuery(graphql`
  query {
     status: file(relativePath: {eq: "status.md"}) {
        id
        childMarkdownRemark {
          frontmatter {
            status {
              id
              content
              image {
                childImageSharp {
                  fluid {
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
      <div className="status">
        <div className="status_container">
          {data.status.childMarkdownRemark.frontmatter.status.map(status =>
            <div className="status_cards">
              <div className="card_content">
                <div className="card_content_img">
                  <img src={status.image.childImageSharp.fluid.src} alt="img1" className="card_svg" />
                </div>
                <div className="card_content_matter">
                  <p className="card_matter">{status.content}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Status;