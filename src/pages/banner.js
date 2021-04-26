import React from "react";
import { useState } from "react";
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
    const showbannerpop = (event) => {
        bannerstyle({ display: 'flex' });
    }
    const closeDisp = () => {
        seTStyle({ display: 'none' });
    };
    const closeqlpop = () => {
        bannerstyle({ display: 'none' });
    };
    const [banner_qr, bannerstyle] = useState({ display: 'none' });
    const [dispImgStyle, seTStyle] = useState({ display: 'none' });
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
                bannerqr {
                    popuptitle
                    popupdescription
                    Playstore {
                      childImageSharp {
                        fluid(quality: 10) {
                          src
                        }
                      }
                    }
                    Appstore {
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
                            <bannerbtn onClick={showbannerpop} role="presentation"><button className="banner_buttons1">{data.banner.childMarkdownRemark.frontmatter.button1}</button></bannerbtn>
                            <bannerbtn onClick={showbannerpop} role="presentation"><button className="banner_buttons2">{data.banner.childMarkdownRemark.frontmatter.button2}</button></bannerbtn>
                        </div>
                        <div className="watchvideo">
                            <div>
                                <img src={playbutton} alt="playbutton" className="playbutton" />
                            </div>
                            <div>
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

               {data.banner.childMarkdownRemark.frontmatter.bannerqr.map(bannerqr =>
                        <div id="banner_qr" style={banner_qr}>
                            <div id="banner_qr_conatiner">
                                <bannertab onClick={closeqlpop} role="presentation"><img src={close} alt="close" id="close2" /></bannertab>
                                <div id="banner_qr_conatiner_block1">
                                    <div id="ql_container_matter_container">
                                        <div id="ql_container_matter">
                                            <h1>{bannerqr.popuptitle}</h1>
                                            <p>{bannerqr.popupdescription}</p>
                                        </div>
                                        <div id="banner_qr_container_input_block">
                                            <h1>Get the link to Download the App</h1>
                                            <div id="banner_qr_container_input_block_container">
                                                <div id="banner_qr_container_input_block_container_container">
                                                    <p id="banner_no_start">+91</p>
                                                    <input type="text" placeholder="Enter Mobile Number" />
                                                </div>
                                                <button>Get App Link</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="banner_qr_conatiner_block2">
                                    <div id="banner_qrs">
                                        <div id="qu_image_container">
                                            <img src={bannerqr.Playstore.childImageSharp.fluid.src} alt="banner_qr" />
                                        </div>
                                        <div id="banner_qr_image_button">
                                            <button><img src={playstorebtn} alt="btn" />Google Play</button>
                                        </div>
                                    </div>

                                    <div id="banner_qrs">
                                        <div id="qu_image_container">
                                            <img src={bannerqr.Appstore.childImageSharp.fluid.src} alt="banner_qr" />
                                        </div>
                                        <div id="banner_qr_image_button">
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