import React from "react";
import "../styles/Contact.scss";
import { graphql, useStaticQuery } from "gatsby";

function Contact() {
    const data = useStaticQuery(graphql`
    query {
       contact: file(relativePath: {eq: "contact.md"}) {
          childMarkdownRemark {
            frontmatter {
                title
                name
                name_place_holder
                mobile
                mobile_placeholder
                mail
                mail_placeholder
                message
                message_placeholder
                button
                background_image {
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
            <div className="contact" id="contact">
                <h1>{data.contact.childMarkdownRemark.frontmatter.title}</h1>
                <div className="contact_contrainer">
                    <div className="contact_img_block" key="11">
                        <img src={data.contact.childMarkdownRemark.frontmatter.background_image.childImageSharp.fluid.src} alt="img1" />
                    </div>
                    <div className="contact_info_block">
                        <div className="contact_info_top">
                            <div className="contact_name">
                                <span key="12">{data.contact.childMarkdownRemark.frontmatter.name}</span>
                                <input type="text" placeholder={data.contact.childMarkdownRemark.frontmatter.name_place_holder} key="13"/>
                            </div>
                            <div className="contact_name">
                                <span key="14">{data.contact.childMarkdownRemark.frontmatter.mobile}</span>
                                <input type="text" placeholder={data.contact.childMarkdownRemark.frontmatter.mobile_placeholder} key="15"/>
                            </div>
                        </div>
                        <div className="contact_mail">
                            <span key="16">{data.contact.childMarkdownRemark.frontmatter.mail}</span>
                            <input type="mail" placeholder={data.contact.childMarkdownRemark.frontmatter.mail_placeholder} key="18"/>
                        </div>
                        <div className="contact_message">
                            <span key="19">{data.contact.childMarkdownRemark.frontmatter.message}</span>
                            <textarea type="mail" placeholder={data.contact.childMarkdownRemark.frontmatter.message_placeholder} key="20"/>
                        </div>
                        <div className="button">
                            <button key="21">{data.contact.childMarkdownRemark.frontmatter.button}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Contact;