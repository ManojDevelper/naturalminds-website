import React, { useState, useEffect } from "react"
import qr1 from "../data/assets/patentqr.png"
import qr2 from "../data/assets/docqr.png"
import playstorebtn from "../data/assets/playstore_btn.svg"
import appstorebtn from "../data/assets/appstore_btn.svg"
import { graphql, useStaticQuery } from "gatsby";
import playbutton from "../data/assets/bannerplaaybuttton.svg";
import "../styles/Banner.scss";
import close from "../data/assets/close.svg";
import video from "../data/assets/bannerpop.mp4";
import Top from "./nav";
import { API_ROOT } from "gatsby-env-variables"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from 'react-bootstrap';
import { Link } from "gatsby";
import takebtn from "../data/assets/taketop.svg";

function Banner() {
    /*==================taketop======================*/
    useEffect(() => {
        window.addEventListener('resize', showButton);

        window.addEventListener('scroll', changeBackground);
        return () => {
            window.removeEventListener('resize', showButton);

            window.removeEventListener('scroll', changeBackground);
        }
    }, [])


    const [navbar, setNavbar] = useState(false);
    const [button, setButton] = useState();
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    useEffect(() => {
        showButton();
        // eslint-disable-next-line
    }, [])

    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true)
        } else {
            setNavbar(false);
        }
    };

    /*================================================*/
    const [lgShow, setLgShow] = useState(false);
    /*==================Api calling for patient form====================*/
    const [errors, setErrors] = useState({});
    const Patentvalidation = () => {
        let errors = {};
        if (!mobile_no) {
            errors.mobile_no = "**Enter your Mobile Number"
        } else {
            errors.mobile_no = ""
        } if (patFinal.status === true) {
            toast.success("Registered")
            setMobile_no("")
        } else {
            toast.error("Please try again")
        }
        return errors;
    }
    const [mobile_no, setMobile_no] = useState("")
    const [patFinal, setPatFinal] = useState("")
    async function sendPat() {
        let item = { mobile_no }

        let patResult = await fetch(API_ROOT + "/api/Spotcare/getPatientLink", {
            method: "POST",
            body: JSON.stringify(item),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        patResult = await patResult.json()
        setErrors(Patentvalidation())
        setPatFinal(patResult)
        console.log(patFinal)
    }
    /*=================================================================*/
    /*==================Api calling for doctor form====================*/
    const [errors2, setErrors2] = useState({});
    const Doctorvalidation = () => {

        let errors2 = {};
        if (!mobile_no2) {
            errors2.mobile_no2 = "**Enter your Mobile Number"
        } else {
            errors2.mobile_no2 = ""
        } if (docFinal.status === true) {
            toast.success("Registered")
            setMobile_no2("")
        } else {
            toast.error("Please try again")
        }
        return errors2;
    }
    const [mobile_no2, setMobile_no2] = useState("")
    const [docFinal, setDocFinal] = useState("")
    async function sendDoc() {
        let item2 = { mobile_no2 }

        let docResult = await fetch(API_ROOT + "/api/Spotcare/getDoctorLink", {
            method: "POST",
            body: JSON.stringify(item2),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
        docResult = await docResult.json()
        setErrors2(Doctorvalidation());
        setDocFinal(docResult);
        console.log(docFinal)
        setMobile_no2("")
    }
    /*=================================================================*/
    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
        setErrors2("")
        setErrors("")
        setMobile_no("")
        setMobile_no2("")
    };
    const [show, setShow] = useState(true)
    const data = useStaticQuery(graphql`
      query {
        banner: file(relativePath: {eq: "banner.md"}) {
            id
            childMarkdownRemark {
              frontmatter {
                title
                description
                decription2
                button1
                button2
                video
              }
            }
          }
         }
    `)
    return (
        <>
            <Top />
            <div className="banner">
                <div className="banner_container">
                    <div id="banner_container_container">
                        <h1 id="banner_h1">{data.banner.childMarkdownRemark.frontmatter.title}</h1>
                        <p id="banner_p">{data.banner.childMarkdownRemark.frontmatter.description}</p>
                        <div className="banner_buttons">
                            <div id="bannerbtn" className={toggleState === 1 ? "show_btn active-show_btn" : "show_btn"}
                                onClick={() => toggleTab(1)} role="presentation"><button className="banner_buttons1">{data.banner.childMarkdownRemark.frontmatter.button1}</button></div>
                            <div id="bannerbtn" className={toggleState === 2 ? "show_btn active-show_btn" : "show_btn"}
                                onClick={() => toggleTab(2)} role="presentation"><button className="banner_buttons2">{data.banner.childMarkdownRemark.frontmatter.button2}</button></div>
                        </div>
                        <div className="watchvideo" onClick={() => setLgShow(true)} role="presentation">
                            <div id="videodiv">
                                <img src={playbutton} alt="playbutton" className="playbutton" />
                            </div>
                            <div id="videodiv">
                                <span>{data.banner.childMarkdownRemark.frontmatter.video}</span>
                            </div>
                        </div>
                        <Modal show={lgShow} onHide={() => setLgShow(false)} centered enforceFocus keyboard size="xl" bsPrefix={"modal"} id="videomodal" backdrop="static">
                            <Modal.Header closeButton  backdrop="static" id="modal-header"/>
                                <div id="banner_pop_video">
                                    <video autoPlay controls>
                                        <source src={video} type="video/mp4" />
                                        <track src="" kind="captions" srclang="en" label="english_captions"></track>
                                    </video>
                                </div>
                        </Modal>
                    </div>
                    <div id="newaddDescription">
                        <p>Our product save patient lives through continuous monitoring of COVID+ Home Quarantined Patients</p>
                    </div>
                    <div id="bannerqr" className={toggleState === 1 ? "cardqr  active-cardqr" : "cardqr"} >
                        {
                            show ?
                                <div id="qr_conatiner">
                                    <img src={close} alt="close" id="close2" onClick={() => toggleTab(setShow)} role="presentation" />
                                    <div id="qr_conatiner_block1">
                                        <div id="ql_container_matter_container">
                                            <div id="ql_container_matter">
                                                <h1>SpotCare® For Patients & General Public</h1>
                                                <p>Adding value to the lives of patients, doctors, health workers, pharmacies, diagnostics and healthcare institutions with the help of new-age technology</p>
                                            </div>
                                            <div id="qr_container_input_block" style={{ position: `relative` }}>
                                                <h1>Get the link to Download the App</h1>
                                                <div id="qr_container_input_block_container">

                                                    <div id="qr_container_input_block_container_container">
                                                        <p>+91</p>
                                                        <input type="text" placeholder="Enter Mobile Number" value={mobile_no} onChange={(e) => setMobile_no(e.target.value || "")} maxLength={10} minLength={10} onKeyPress={event => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }} />
                                                    </div>
                                                    {(!mobile_no || mobile_no.length < 10) ? (
                                                        <button disabled style={{ background: `gray` }}>Get App Link</button>) : (
                                                        <button onClick={sendPat}>Get App Link</button>
                                                    )}
                                                </div>
                                                {errors.mobile_no && <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, margin: `0`, transition: `0.5s ease` }}>{errors.mobile_no}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div id="qr_conatiner_block2">
                                        <div id="qrs">
                                            <div id="qu_image_container">
                                                <img src={qr1} alt="qr" />
                                            </div>
                                            <div id="qr_image_button">
                                                <button><a href="https://play.google.com/store/apps/details?id=com.carereceiver" target="_blank" rel="noopener noreferrer"><img src={playstorebtn} alt="btn" />Google Play</a></button>
                                                <button><a href=" https://apps.apple.com/in/app/spotcare-patients-public/id1535914517" target="_blank" rel="noopener noreferrer"><img src={appstorebtn} alt="btn" />App Store</a></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>

                    <div id="bannerqr" className={toggleState === 2 ? "cardqr  active-cardqr" : "cardqr"} >
                        {
                            show ?
                                <div id="qr_conatiner">
                                    <img src={close} alt="close" id="close2" onClick={() => toggleTab(setShow)} role="presentation" />
                                    <div id="qr_conatiner_block1">
                                        <div id="ql_container_matter_container">
                                            <div id="ql_container_matter">
                                                <h1>SpotCare® For Doctors & Health Service Providers</h1>
                                                <p>Adding value to the lives of patients, doctors, health workers, pharmacies, diagnostics and healthcare institutions with the help of new-age technology</p>
                                            </div>
                                            <div id="qr_container_input_block" style={{ position: `relative` }}>
                                                <h1>Get the link to Download the App</h1>
                                                <div id="qr_container_input_block_container">
                                                    <div id="qr_container_input_block_container_container">
                                                        <p>+91</p>
                                                        <input type="text" placeholder="Enter Mobile Number" value={mobile_no2} onChange={(e) => setMobile_no2(e.target.value || "")} maxLength={10} minLength={10} onKeyPress={event => { if (!/[0-9]/.test(event.key)) { event.preventDefault() } }} />
                                                    </div>
                                                    {(!mobile_no2 || mobile_no2.length < 10) ? (
                                                        <button disabled style={{ background: `gray` }}>Get App Link</button>) : (
                                                        <button onClick={sendDoc}>Get App Link</button>
                                                    )}
                                                </div>
                                                {errors2.mobile_no2 && <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, margin: `0`, transition: `0.5s ease` }}>{errors2.mobile_no2}</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div id="qr_conatiner_block2">
                                        <div id="qrs">
                                            <div id="qu_image_container">
                                                <img src={qr2} alt="qr" />
                                            </div>
                                            <div id="qr_image_button">
                                                <button><a href="https://play.google.com/store/apps/details?id=com.naturalminds" target="_blank" rel="noopener noreferrer" ><img src={playstorebtn} alt="btn" />Google Play</a></button>
                                                <button><a href="https://apps.apple.com/in/app/spotcare-care-provider/id1528551730" target="_blank" rel="noopener noreferrer" ><img src={appstorebtn} alt="btn" />App Store</a></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
            <div id={navbar ? 'image_taketop' : 'image_taketop2'}>
                <Link to="/landing/"><img src={takebtn} alt="taketop" /></Link>
            </div>
        </>
    );
};
export default Banner;