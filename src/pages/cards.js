import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import rate from "../data/assets/rate.svg";
import "../styles/Cards.scss";
import { useState } from "react";
import { API_ROOT } from "gatsby-env-variables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cards() {
  const data = useStaticQuery(graphql`
      query {
        cards: file(relativePath: {eq: "cards.md"}) {
          id
          childMarkdownRemark {
            frontmatter {
              title
              cards {
                id
                cardid
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
                <div className={cards.class1} key={cards.id} id={cards.cardid}>
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
                          <button><a href="https://qrs.ly/9bcj0lp" target="_blank" rel="noopener noreferrer" style={{textDecoration: `none`, color: `white`, width: `100%`, height: `100%`}}>Doctor App</a></button>
                          <button id="cardbtn2"><a href="https://qrs.ly/r3cj0mt" target="_blank" rel="noopener noreferrer" style={{textDecoration: `none`, color: `white`}} >Patient App</a></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>

    </>
  );
};
export default Cards;