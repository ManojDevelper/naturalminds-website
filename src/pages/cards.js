import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import close from "../data/assets/close.svg";
import qr1 from "../data/assets/googleplay_qr.png"
import playstorebtn from "../data/assets/playstore_btn.svg"
import qr2 from "../data/assets/appstore_qr.png"
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
         }
    `)
  return (
    <>
      <div id="cards_main_container">
        <div className="cards">
          <h1>{data.cards.childMarkdownRemark.frontmatter.title}</h1>
          <div className="card_container">
            {data.cards.childMarkdownRemark.frontmatter.cards.map(cards =>
              <div className={cards.class1}>
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
                          <div id="slide_cards_card1">
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
                      <tab className={toggleState === (cards.id) ? "show_btn active-show_btn" : "show_btn"}
                        onClick={() => toggleTab(cards.id)}><button>{cards.button}</button></tab>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {data.cards.childMarkdownRemark.frontmatter.cards.map(cards =>
        <div id="qr" className={toggleState === (cards.id) ? "cardqr  active-cardqr" : "cardqr"}>
        {
              show ?
          <div id="qr_conatiner">
            <img src={close} alt="close" id="close2" onClick={() => toggleTab(setShow)} role="presentation"/>
            <div id="qr_conatiner_block1">
              <div id="ql_container_matter_container">
                <div id="ql_container_matter">
                <h1>{cards.title}<img src={rate} alt="img1" id="rate2" /></h1>
                      <p>{cards.content}</p>
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
                </div>
              </div>

              <div id="qrs">
                <div id="qu_image_container">
                  <img src={qr2} alt="qr" />
                </div>
                <div id="qr_image_button">
                  <button><img src={appstorebtn} alt="btn" />App Store</button>
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