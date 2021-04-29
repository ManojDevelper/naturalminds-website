import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import close from "../data/assets/close.svg";
import qr1 from "../data/assets/googleplay_qr.png"
import playstorebtn from "../data/assets/playstore_btn.svg"
import appstorebtn from "../data/assets/appstore_btn.svg"
import rate from "../data/assets/rate.svg"
import "../styles/Cards.scss";
import { useState } from "react";

function Cards() {
  const [toggleState, setToggleState] = useState(0);

  const toggleTab = (index) => {
    setToggleState(index);
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
        {data.cardqr.childMarkdownRemark.frontmatter.qr.map(qr =>
          <div id="qr" className={toggleState === (qr.id) ? "cardqr  active-cardqr" : "cardqr"}>
            {
              show ?
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
                      <a href={qr.link1} target="_blank" rel="noopener noreferrer"><button><img src={playstorebtn} alt="btn" />Google Play</button></a>
                      <a href={qr.link2} target="_blank" rel="noopener noreferrer"><button><img src={appstorebtn} alt="btn" />App Store</button></a>
                      </div>
                    </div>
                  </div>
                </div>
                : null
            }
          </div>
        )}
      </div>

    </>
  );
};
export default Cards;