import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import close from "../data/assets/close.svg";
import qr1 from "../data/assets/googleplay_qr.png"
import playstorebtn from "../data/assets/playstore_btn.svg"
import appstorebtn from "../data/assets/appstore_btn.svg"
import rate from "../data/assets/rate.svg"
import "../styles/Cards.scss";
import { useState } from "react";
import { API_ROOT } from "gatsby-env-variables"

function Cards() {
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
    } else if (mobile_no.length < 9) {
      errors2.mobile_no2 = "**Please Enter Valid Mobile Number"
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
        cards: file(relativePath: {eq: "cards.md"}) {
          id
          childMarkdownRemark {
            frontmatter {
              title
              cards {
                id
                title
                class1
                class2
                content
                button
                button2
                minicards {
                  id
                  title
                  blockcontent
                  logo {
                    childImageSharp {
                      fluid(quality: 30) {
                        src
                      }
                    }
                  }
                }
                image {
                  childImageSharp {
                    fluid(quality: 30) {
                      src
                    }
                  }
                } 
              }
            }
          }
        }
        cardqr: file(relativePath: {eq: "qr.md"}) {
          id
          childMarkdownRemark {
            frontmatter {
              qr {
                id
                title
                description
                link1
                link2
                storeqr {
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
      <div id="ourproducts">
        <div id="cards_main_container">
          <div className="cards">
            <h1>{data.cards.childMarkdownRemark.frontmatter.title}</h1>
            <div className="card_container">
              {data.cards.childMarkdownRemark.frontmatter.cards.map(cards =>
                <div className={cards.class1} key={cards.id}>
                  <div className={cards.class2}>
                    <div className="slidecards_svg">
                      <div className="slidecards_svg_container">
                        <img src={cards.image.childImageSharp.fluid.src} alt="img" id="lap1"></img>
                      </div>
                    </div>
                    <div className="slidecards_matter">
                      <div className="slicards_matter_container">
                        <h2>{cards.title}<img src={rate} alt="img1" id="rate" /></h2>
                        <p>{cards.content}</p>
                        <div id="slide_cards_container">
                          {cards.minicards.map(minicards =>
                            <div id="slide_cards_card1" key={minicards.id}>
                              <div id="slide_cards_logo">
                                <div id="slide_cards_logo_container">
                                  <img src={minicards.logo.childImageSharp.fluid.src} alt="img1" />
                                </div>
                              </div>
                              <div id="slide_cards_matter_container">
                                <h6>{minicards.title}</h6>
                                <p>{minicards.blockcontent}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div id="card_btns">
                          <tab className={toggleState === 2 ? "show_btn active-show_btn" : "show_btn"}
                            onClick={() => toggleTab(2)}><button>Doctor App</button></tab>
                          <tab className={toggleState === 1 ? "show_btn active-show_btn" : "show_btn"}
                            onClick={() => toggleTab(1)}><button id="cardbtn2">Patient App</button></tab>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div id="qr" className={toggleState === 2 ? "cardqr  active-cardqr" : "cardqr"}>
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
                        {errors2.mobile_no2 && <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, margin: `0` }}>{errors2.mobile_no2}</p>}
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

          <div id="qr" className={toggleState === 1 ? "cardqr  active-cardqr" : "cardqr"}>
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
                        {errors.mobile_no && <p className="errors" style={{ fontSize: `1vw`, color: `orange`, position: `absolute`, margin: `0` }}>{errors.mobile_no}</p>}
                      </div>
                    </div>
                  </div>
                  <div id="qr_conatiner_block2">
                    <div id="qrs">
                      <div id="qu_image_container">
                        <img src={qr1} alt="qr" />
                      </div>
                      <div id="qr_image_button">
                        <a href="https://play.google.com/store/apps/details?id=com.carereceiver" target="_blank" rel="noopener noreferrer" ><button><img src={playstorebtn} alt="btn" />Google Play</button></a>
                        <a href=" https://apps.apple.com/in/app/spotcare-patients-public/id1535914517" target="_blank" rel="noopener noreferrer" ><button><img src={appstorebtn} alt="btn" />App Store</button></a>
                      </div>
                    </div>
                  </div>
                </div>
                : null
            }
          </div>
        </div>
      </div>

    </>
  );
};
export default Cards;