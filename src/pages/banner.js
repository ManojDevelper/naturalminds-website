import React, { useState } from "react"
import qr1 from "../data/assets/googleplay_qr.png"
import playstorebtn from "../data/assets/playstore_btn.svg"
import appstorebtn from "../data/assets/appstore_btn.svg"
import { graphql, useStaticQuery } from "gatsby";
import playbutton from "../data/assets/bannerplaaybuttton.svg";
import "../styles/Banner.scss";
import close from "../data/assets/close.svg";
import video from "../data/assets/bannerpop.mp4";
import Top from "./nav";

function Banner() {
    /*==================Api calling for patient form====================*/
    const [errors, setErrors] = useState({});
    const Patentvalidation = () => {

        let errors = {};
        if (!mobile_no) {
            errors.mobile_no = "**Enter your Mobile Number"
        } else if (mobile_no.length < 9) {
            errors.mobile_no = "Please enter valid mobile number"
        }
        return errors;
    }
    const [mobile_no, setMobile_no] = useState("")
    const [patFinal, setPatFinal] = useState("")
    async function sendPat() {
        let item = { mobile_no }

        let patResult = await fetch("https://stag.spotcare.in/api/Spotcare/getPatientLink", {
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
        } else if (mobile_no.length < 9) {
            errors2.mobile_no2 = "**Please Enter Valid Mobile Number"
        }
        return errors2;
    }
    const [mobile_no2, setMobile_no2] = useState("")
    const [docFinal, setDocFinal] = useState("")
    async function sendDoc() {
        let item2 = { mobile_no2 }

        let docResult = await fetch("https://stag.spotcare.in/api/Spotcare/getDoctorLink", {
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
    }
    /*=================================================================*/
    const showImage = (event) => {
        seTStyle({ display: 'flex' });
    }
    const closeDisp = () => {
        seTStyle({ display: 'none' });
    };
    const [dispImgStyle, seTStyle] = useState({ display: 'none' });
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
            <div className="banner">
                <Top />
                <div className="banner_content_wrapper">
                    <div className="banner_container">
                        <h1 id="banner_h1">{data.banner.childMarkdownRemark.frontmatter.title}</h1>
                        <p id="banner_p">{data.banner.childMarkdownRemark.frontmatter.description}</p>
                        <div className="banner_buttons">
                            <bannerbtn key="1" className={toggleState === 1 ? "show_btn active-show_btn" : "show_btn"}
                                onClick={() => toggleTab(1)}><button className="banner_buttons1">{data.banner.childMarkdownRemark.frontmatter.button1}</button></bannerbtn>
                            <bannerbtn key="2" className={toggleState === 2 ? "show_btn active-show_btn" : "show_btn"}
                                onClick={() => toggleTab(2)}><button className="banner_buttons2">{data.banner.childMarkdownRemark.frontmatter.button2}</button></bannerbtn>
                        </div>
                        <div className="watchvideo">
                            <div id="videodiv">
                                <img src={playbutton} alt="playbutton" className="playbutton" />
                            </div>
                            <div id="videodiv">
                                <span onClick={showImage} role="presentation">{data.banner.childMarkdownRemark.frontmatter.video}</span>
                            </div>
                        </div>
                        <div id="banner_popup" style={dispImgStyle}>
                            <div id="banner_pop_close">
                                <div id="banner_pop_video">
                                    <img src={close} alt="close" onClick={closeDisp} role="presentation" />
                                    <video controls>
                                        <source src={video} type="video/mp4" />
                                    </video>
                                </div>
                            </div>
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
                                                        <button onClick={sendPat}>Get App Link</button>

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
                                                    <a href="https://play.google.com/store/apps/details?id=com.carereceiver" target="_blank" rel="noopener noreferrer" key="3"><button><img src={playstorebtn} alt="btn" />Google Play</button></a>
                                                    <a href=" https://apps.apple.com/in/app/spotcare-patients-public/id1535914517" target="_blank" rel="noopener noreferrer" key="4"><button><img src={appstorebtn} alt="btn" />App Store</button></a>
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
                                                        <button onClick={sendDoc}>Get App Link</button>
                                                    </div>
                                                    {errors2.mobile_no2 && <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, margin: `0`, transition: `0.5s ease` }}>{errors2.mobile_no2}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div id="qr_conatiner_block2">
                                            <div id="qrs">
                                                <div id="qu_image_container">
                                                    <img src={qr1} alt="qr" />
                                                </div>
                                                <div id="qr_image_button">
                                                    <a href="https://play.google.com/store/apps/details?id=com.naturalminds" target="_blank" rel="noopener noreferrer" ><button><img src={playstorebtn} alt="btn" />Google Play</button></a>
                                                    <a href="https://apps.apple.com/in/app/spotcare-care-provider/id1528551730" target="_blank" rel="noopener noreferrer" ><button><img src={appstorebtn} alt="btn" />App Store</button></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Banner;