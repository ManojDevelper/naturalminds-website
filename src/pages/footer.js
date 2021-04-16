import React from "react";
import "../styles/Footer.scss";
import { graphql, useStaticQuery } from "gatsby"

function Footer() {
  const data = useStaticQuery(graphql`
  query {
    footer: file(relativePath: {eq: "footer.md"}) {
        id
        childMarkdownRemark {
          frontmatter {
            copyright
            footer {
              id
              title
              list1
              list2
              list3
              list4
            }
            footericons {
              image {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            image1 {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
            image2 {
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
`)
  return (
    <>
      <div className="footer">
        <div className="footer_container">
          {data.footer.childMarkdownRemark.frontmatter.footer.map(footer =>
            <div className="footer_block1">
              <div className="footer_b1_title">
                <p id="f_b_t">{footer.title}</p>
              </div>
              <div className="footer_b1_content">
                <p id="footer_content">{footer.list1}</p>
                <p id="footer_content">{footer.list2}</p>
                <p id="footer_content">{footer.list3}</p>
                <p id="footer_content">{footer.list4}</p>
              </div>
            </div>
          )}
          <div className="footer_img">
            <div className="playstore">
              <img src={data.footer.childMarkdownRemark.frontmatter.image1.childImageSharp.fluid.src} alt="img1" />
            </div>
            <div className="appstore">
              <img src={data.footer.childMarkdownRemark.frontmatter.image2.childImageSharp.fluid.src} alt="img1" />
            </div>
          </div>
        </div>
        <div className="footer_icons">
          {data.footer.childMarkdownRemark.frontmatter.footericons.map(footericons =>
            <img src={footericons.image.childImageSharp.fluid.src} alt="img1" />
          )}
        </div>
        <p id="footer_footer">{data.footer.childMarkdownRemark.frontmatter.copyright}</p>
      </div>
    </>
  );
};
export default Footer;