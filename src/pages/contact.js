import React from "react";
import "../styles/Contact.scss";
import Top from "./nav";
import Footer from "./footer";
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
            <div className="contact2 ContactUs" id="contact2">
            <Top/>
                <h1 key="23">{data.contact.childMarkdownRemark.frontmatter.title}</h1>
                <div className="contact_contrainer2">
                    <div className="contact_img_block">
                        <img src={data.contact.childMarkdownRemark.frontmatter.background_image.childImageSharp.fluid.src} alt="img1" key="22"/>
                    </div>
                    <div className="contact_info_block">
                        <div className="contact_info_top">
                            <div className="contact_name">
                                <span key="24">{data.contact.childMarkdownRemark.frontmatter.name}</span>
                                <input type="text" placeholder={data.contact.childMarkdownRemark.frontmatter.name_place_holder} key="25"/>
                            </div>
                            <div className="contact_name">
                                <span key="26">{data.contact.childMarkdownRemark.frontmatter.mobile}</span>
                                <input type="text" placeholder={data.contact.childMarkdownRemark.frontmatter.mobile_placeholder} key="27"/>
                            </div>
                        </div>
                        <div className="contact_mail">
                            <span key="28">{data.contact.childMarkdownRemark.frontmatter.mail}</span>
                            <input type="mail" placeholder={data.contact.childMarkdownRemark.frontmatter.mail_placeholder} key="29"/>
                        </div>
                        <div className="contact_message">
                            <span key="30">{data.contact.childMarkdownRemark.frontmatter.message}</span>
                            <textarea type="mail" placeholder={data.contact.childMarkdownRemark.frontmatter.message_placeholder} key="31"/>
                        </div>
                        <div className="button">
                            <button key="32">{data.contact.childMarkdownRemark.frontmatter.button}</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default Contact;