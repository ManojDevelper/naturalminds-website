import React from "react";
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Cards.scss";

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
                    <h2>{cards.title}</h2>
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
                    <button>{cards.button}</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};
export default Cards;