import React, { useState } from "react"
import "../styles/Contact.scss";
import { graphql, useStaticQuery } from "gatsby";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_ROOT } from "gatsby-env-variables";


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
    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [email, setEmail] = useState("")
    const [query, setQuery] = useState("")
    const [status, setStatus] = useState("")
    const [errors, setErrors] = useState({});
    const validation = () => {

        let errors = {};
        if (!name) {
            errors.name = "**Name is Required"
        } else if (name < 3) {
            errors.name = "**Name should be more then 3"
        } if (!subject) {
            errors.subject = "**Please enter your subject"
        } if (!email) {
            errors.email = "**Please enter your Email"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "*Email is invalid"
        } if (!query) {
            errors.query = "**Please enter your query"
        }
        return errors;
    }
    /*=======================Api calling=========================*/
    async function contactSubmit() {
        let item = { name, subject, email, query }

        let result = await fetch(API_ROOT+"/api/contactUs", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        result = await result.json()
        setStatus(result)
        setErrors(validation());
        if (result.status === true) {
            toast.success(result.msg, {
                position: `top-center`
            })
        }else {
            toast.error("Please Try Again", {
                position: `top-center`
            })
        }

    }
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
                            <div className="contact_name" style={{ position: `relative` }}>
                                <span key="12">{data.contact.childMarkdownRemark.frontmatter.name}</span>
                                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                                <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, bottom: `-3vw` }}>{errors.name}</p>
                            </div>
                            <div className="contact_name" style={{ position: `relative` }}>
                                <span key="14">{data.contact.childMarkdownRemark.frontmatter.mobile}</span>
                                <input type="text" placeholder="Number" value={subject} onChange={e => setSubject(e.target.value)} />
                             <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, bottom: `-3vw` }}>{errors.subject}</p>
                            </div>
                        </div>
                        <div className="contact_mail" style={{ position: `relative` }}>
                            <span key="16">{data.contact.childMarkdownRemark.frontmatter.mail}</span>
                            <input type="mail" placeholder="chrisdo@gmail.com" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                            <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, bottom: `-3vw` }}>{errors.email}</p>
                        </div>
                        <div className="contact_message" style={{ position: `relative` }}>
                            <span>Message</span>
                            <textarea type="mail" placeholder="Please Type Your Response" type="text" value={query} onChange={e => setQuery(e.target.value)} />
                            <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, bottom: `-3vw` }}>{errors.query}</p>
                        </div>
                        <div className="button">
                        {(!name || !subject || !email || !/\S+@\S+\.\S+/.test(email) || !query) ? (
                            <button onClick={contactSubmit} disabled style={{background: `gray`}}>{data.contact.childMarkdownRemark.frontmatter.button}</button>
                      ) : (
                        <>
                        <button onClick={contactSubmit}>{data.contact.childMarkdownRemark.frontmatter.button}</button>
                        </>
                      )}
                            
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
export default Contact;