import React from "react";
import { useState } from "react";
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
          cardqr: file(relativePath: {eq: "qr.md"}) {
            id
            childMarkdownRemark {
              frontmatter {
                qr {
                  id
                  title
                  description
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
            <div className="banner">
                <Top />
                <div className="banner_content_wrapper">
                    <div className="banner_container">
                        <h1>{data.banner.childMarkdownRemark.frontmatter.title}</h1>
                        <p>{data.banner.childMarkdownRemark.frontmatter.description}</p>
                        <div className="banner_buttons">
                            <bannerbtn className={toggleState === 1 ? "show_btn active-show_btn" : "show_btn"}
                                onClick={() => toggleTab(1)}><button className="banner_buttons1">{data.banner.childMarkdownRemark.frontmatter.button1}</button></bannerbtn>
                            <bannerbtn className={toggleState === 2 ? "show_btn active-show_btn" : "show_btn"}
                                onClick={() => toggleTab(2)}><button className="banner_buttons2">{data.banner.childMarkdownRemark.frontmatter.button2}</button></bannerbtn>
                        </div>
                        <div className="watchvideo">
                            <div>
                                <img src={playbutton} alt="playbutton" className="playbutton" />
                            </div>
                            <div>
                                <span>{data.banner.childMarkdownRemark.frontmatter.video}</span>
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
                        {data.cardqr.childMarkdownRemark.frontmatter.qr.map(qr =>
                            <div id="bannerqr" className={toggleState === (qr.id) ? "cardqr  active-cardqr" : "cardqr"}>
                                <div id="qr_conatiner">
                                    <img src={close} alt="close" id="close2" onClick={() => toggleTab(setShow)} role="presentation" />
                                    <div id="qr_conatiner_block1">
                                        <div id="ql_container_matter_container">
                                            <div id="ql_container_matter">
                                                <h1>{qr.title}</h1>
                                                <p>{qr.description}</p>
                                            </div>
                                            <div id="qr_container_input_block">
                                                <h1>Get the link to Download the App</h1>
                                                <div id="qr_container_input_block_container">
                                                    <div id="qr_container_input_block_container_container">
                                                        <p>+91</p>
                                                        <input type="text" placeholder="Enter Mobile Number" />
                                                    </div>
                                                    <button>Get App Link</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="qr_conatiner_block2">
                                        <div id="qrs">
                                            <div id="qu_image_container">
                                                <img src={qr1} alt="qr" />
                                            </div>
                                            <div id="qr_image_button">
                                                <button><img src={playstorebtn} alt="btn" />Google Play</button>
                                                <button><img src={appstorebtn} alt="btn" />App Store</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default Banner;