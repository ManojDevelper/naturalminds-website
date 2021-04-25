import React from "react";
import { useState } from "react";
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
                        <h1>{data.banner.childMarkdownRemark.frontmatter.title}</h1>
                        <p>{data.banner.childMarkdownRemark.frontmatter.description}</p>
                        <div className="banner_buttons">
                            <button className="banner_buttons1">{data.banner.childMarkdownRemark.frontmatter.button1}</button>
                            <button className="banner_buttons2">{data.banner.childMarkdownRemark.frontmatter.button2}</button>
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
                            <img src={close} alt="close" onClick={closeDisp} role="presentation"/>
                                <video controls>
                                    <source src={video} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Banner;