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
            errors.name = "red"
        } else if (name < 3) {
            errors.name = "red"
        } if (!subject) {
            errors.subject = "red"
        } if (!email) {
            errors.email = "red"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "red"
        } if (!query) {
            errors.query = "red"
        }
        return errors;
    }
    /*=======================Api calling=========================*/
    async function contactSubmit() {
        let item = { name, subject, email, query }

        let result = await fetch(API_ROOT + "/api/contactUs", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        result = await result.json()
        setStatus(result)
        console.log(status)
        if (result.status === true) {
            toast.success(result.msg, {
                position: `top-center`
            })
        } else {
            toast.error("Please Try Again", {
                position: `top-center`
            })
        }

    }
    function signup2(){
        setErrors(validation())
    }
    return (
        <>
            <div className="contact" id="contact">
                <h1>{data.contact.childMarkdownRemark.frontmatter.title}</h1>
                <div className="contact_contrainer">
                    <div className="contact_img_block">
                        <img src={data.contact.childMarkdownRemark.frontmatter.background_image.childImageSharp.fluid.src} alt="img1" />
                    </div>
                    <div className="contact_info_block">
                        <div className="contact_info_top">
                            <div className="contact_name" style={{ position: `relative` }}>
                                {(!name) || (name.length < 3) ? (<span style={{ color: (errors.name) }}>{data.contact.childMarkdownRemark.frontmatter.name}</span>) : (<span>{data.contact.childMarkdownRemark.frontmatter.name}</span>)}
                                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div className="contact_name" style={{ position: `relative` }}>
                            {(!subject) ? (<span style={{ color: (errors.subject) }}>{data.contact.childMarkdownRemark.frontmatter.mobile}</span>) : (<span>{data.contact.childMarkdownRemark.frontmatter.mobile}</span>)}
                                <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                            </div>
                        </div>
                        <div className="contact_mail" style={{ position: `relative` }}>
                        {(!email || (!/\S+@\S+\.\S+/.test(email))) ? (<span style={{ color: (errors.email) }}>{data.contact.childMarkdownRemark.frontmatter.mail}</span>) : (<span>{data.contact.childMarkdownRemark.frontmatter.mail}</span>)}
                            <input type="mail" placeholder="chrisdo@gmail.com" type="text" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="contact_message" style={{ position: `relative` }}>
                        {(!query) || (query.length < 10) ? (<span style={{ color: (errors.query) }}>Message</span>) : (<span>Message</span>)}
                            <textarea type="mail" placeholder="Please Type Your Response" type="text" value={query} onChange={e => setQuery(e.target.value)} />
                        </div>
                        <div className="button">
                            {(!name || !subject || !email || !/\S+@\S+\.\S+/.test(email) || !query || query.length < 10) ? (
                                <button onClick={signup2} style={{ background: `gray` }}>{data.contact.childMarkdownRemark.frontmatter.button}</button>
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