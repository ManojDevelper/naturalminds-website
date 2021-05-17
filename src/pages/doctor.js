import React, { useState, useEffect } from "react";
import "../styles/Doctor.scss";
import qr1 from "../data/assets/patentqr.png"
import playstorebtn from "../data/assets/playstore_btn.svg"
import appstorebtn from "../data/assets/appstore_btn.svg"
import close from "../data/assets/close.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import icon1 from "../data/assets/find_doc1.svg";
import icon2 from "../data/assets/find_doc2.svg";
import icon3 from "../data/assets/find_doc3.svg";
import icon4 from "../data/assets/find_doc4.svg";
import icon from "../data/assets/searchwhite.svg";
import male from "../data/assets/male.png";
import female from "../data/assets/female.jpeg";
import { graphql, useStaticQuery } from "gatsby";
import Top from "./nav";
import { API_ROOT } from "gatsby-env-variables";
import Footer from "./footer";
import _ from "lodash";
import { Link } from "gatsby";
import takebtn from "../data/assets/taketop.svg";


function Doctor() {
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
  const showImage = (event) => {
    seTStyle({ display: 'flex' });
  }
  const closeDisp = () => {
    seTStyle({ display: 'none' });
    setMobile_no("")
    setErrors("")
  };
  const [dispImgStyle, seTStyle] = useState({ display: 'none' });
  const data = useStaticQuery(graphql`
    query {
      doctors: file(relativePath: { eq: "doctors.md" }) {
        id
        childMarkdownRemark {
          frontmatter {
            no_of_doctors
            note
            note_description
            playstore {
              childImageSharp {
                fluid(quality: 10) {
                  src
                }
              }
            }
            appstore {
              childImageSharp {
                fluid(quality: 10) {
                  src
                }
              }
            }
          }
        }
      }
    }
  `)
  const [searchTerm, setSearchTerm] = useState("")
  const [final, setFinal] = useState("")
  const inputValue = event => {
    const data = event.target.value
    console.log(data)
    setSearchTerm(data)
  }
  async function search() {
    let item = { searchTerm }
    let result = await fetch(
      API_ROOT + "/api/spotcare/searchDoctors",
      {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    result = await result.json()
    setFinal(result)
    console.log(final)
  }
  useEffect(() => {
    search();
    // eslint-disable-next-line
  }, [])

  return (
    <>      <Top />
      <div id="doctors">
        <div id="doctor_container_main">
          <div id="doctor_container">
            <div id="doctor_search">
              <input
                type="search"
                placeholder="Search by name, specialization, phone number"
                onChange={inputValue}
              />
              <div id="doctor_img_container">
                <img
                  src={icon}
                  alt="search"
                  onClick={search}
                  role="presentation"
                />
              </div>
            </div>
          </div>
          <div id="doctors_cards_container">
            <p id="doctors_footer_title">{final.count} Doctors found</p>
            <div id="doc_footer">
              <div id="doc_footer_block1">
                <p>
                  <span style={{ fontWeight: `600` }}>
                    {data.doctors.childMarkdownRemark.frontmatter.note}
                  </span>
                  {data.doctors.childMarkdownRemark.frontmatter.note_description}
                </p>
              </div>
              <div id="doc_footer_block2">
                <a href="https://play.google.com/store/apps/details?id=com.carereceiver" rel="noopener noreferrer" style={{ cursor: `pointer` }} target="_blank"><img src={data.doctors.childMarkdownRemark.frontmatter.playstore.childImageSharp.fluid.src} alt="image1" id="doc_store1" /></a>
                <a href="https://apps.apple.com/in/app/spotcare-patients-public/id1535914517" rel="noopener noreferrer" style={{ cursor: `pointer`, listStyleType: `none`, textDecoration: `none` }} target="_blank"><img src={data.doctors.childMarkdownRemark.frontmatter.appstore.childImageSharp.fluid.src} alt="image2" /></a>
              </div>
            </div>
            <div id="doc_all_cards">
              {final &&
                final.data.map((key, i) => (
                  <div id="doc_card1" key={i}>
                    <div id="doc_card1_block1">
                      <div id="doc_card1_block1_image_container">

                        {!_.isEmpty(key.profile_image) ? (
                          <img src={key.profile_image} alt={key.name} />
                        ) : (
                          <>
                            {(!key.gender) || key.gender.toLowerCase() === "male" ||
                              key.gender.toLowerCase() === "m" ? (
                              <img src={male} alt="male" />
                            ) : (
                              <>
                                {key.gender.toLowerCase() === "female" || key.gender.toLowerCase() === "f" ? (
                                  <img src={female} alt="female" />
                                ) : (<img src={female} alt="female" />)}
                              </>
                            )}
                          </>
                        )}
                      </div>
                      <div id="doc_card1_block1_matter_container">
                        <p id="doc_card_title">{key.name}</p>
                        <div id="block_icon_container">
                          <div id="block_icon_container_container2">
                            <img src={icon1} alt="img1" id="cont_icon_img" />
                          </div>
                          <div id="block_icon_container_container">
                            <div>
                              <p>{key.doc_type_name}</p>
                            </div>
                          </div>
                        </div>
                        <div id="block_icon_container">
                          <div id="block_icon_container_container2">
                            <img src={icon2} alt="img1" id="cont_icon_img" />
                          </div>
                          <div id="block_icon_container_container">
                            <div>
                              <p>License No: {key.license_no}</p>
                            </div>
                          </div>
                        </div>
                        <div id="block_icon_container">
                          <div id="block_icon_container_container2">
                            <img src={icon3} alt="img1" id="cont_icon_img" />
                          </div>
                          <div id="block_icon_container_container">
                            <div>
                              <p>Mail: {key.email_id}</p>
                            </div>
                          </div>
                        </div>
                        <div id="block_icon_container">
                          <div id="block_icon_container_container2">
                            <img src={icon4} alt="img1" id="cont_icon_img" />
                          </div>
                          <div id="block_icon_container_container">
                            <div>
                              <p>{key.city}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div id="doc_card1_block2">
                      <div>
                        <button id="doc_btn1">View Full Profile</button>
                      </div>
                      <div onClick={showImage} role="presentation">
                        <button id="doc_btn2">GetApp</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div id="finddr_qr_container" style={dispImgStyle}>
            <div id="qr_conatiner">
              <img src={close} alt="close" id="close2" onClick={closeDisp} role="presentation" />
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
          </div>
          <Footer />
          <ToastContainer />
          <div id={navbar ? 'image_taketop' : 'image_taketop2'}>
                    <Link to="/doctor/"><img src={takebtn} alt="taketop" /></Link>
                </div>
        </div>
      </div>
    </>
  )
}
export default Doctor
