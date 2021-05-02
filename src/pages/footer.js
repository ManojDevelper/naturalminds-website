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
            app1
            app2
            footer {
              id
              title
              list1
              list2
              list3
              list4
            }
            footericons {
              link
              image {
                childImageSharp {
                  fluid {
                    src
                  }
                }
              }
            }
            store1 {
              childImageSharp {
                fluid {
                  src
                }
              }
            }
            store2 {
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
            <div className="footer_block1" key={footer.id}>
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
            <p id="footer_app_content"></p>
            <div id="store">
              <a href=" https://apps.apple.com/in/app/spotcare-care-provider/id1528551730" rel="noopener noreferrer" style= {{cursor: `pointer`, listStyleType: `none`, textDecoration: `none`}} target="_blank"><p>{data.footer.childMarkdownRemark.frontmatter.app1}<img src={data.footer.childMarkdownRemark.frontmatter.store1.childImageSharp.fluid.src} alt="img1" /><img src={data.footer.childMarkdownRemark.frontmatter.store2.childImageSharp.fluid.src} alt="img1" /></p></a>
            </div>
            <div id="store">
            <a href="https://apps.apple.com/in/app/spotcare-patients-public/id1535914517"  rel="noopener noreferrer" style= {{cursor: `pointer`, listStyleType: `none`, textDecoration: `none`}} target="_blank"><p>{data.footer.childMarkdownRemark.frontmatter.app2}<img src={data.footer.childMarkdownRemark.frontmatter.store1.childImageSharp.fluid.src} alt="img1" /><img src={data.footer.childMarkdownRemark.frontmatter.store2.childImageSharp.fluid.src} alt="img1" /></p></a>
            </div>
          </div>
        </div>
        <div className="footer_icons">
          {data.footer.childMarkdownRemark.frontmatter.footericons.map(footericons =>
            <a href={footericons.link} target="_blank" without rel="noopener noreferrer"><img src={footericons.image.childImageSharp.fluid.src} alt="img1" key={footericons.id}/></a>
          )}
        </div>
        <p id="footer_footer" key="40">{data.footer.childMarkdownRemark.frontmatter.copyright}</p>
      </div>
    </>
  );
};
export default Footer;