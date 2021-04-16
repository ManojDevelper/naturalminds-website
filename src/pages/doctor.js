import React from "react";
import "../styles/Doctor.scss";
import icon1 from "../data/assets/find_doc1.svg";
import icon2 from "../data/assets/find_doc2.svg";
import icon3 from "../data/assets/find_doc3.svg";
import icon4 from "../data/assets/find_doc4.svg";
import icon from "../data/assets/searchwhite.svg";
import { graphql, useStaticQuery } from "gatsby"
import Top from "./nav"

function Doctor() {
  const data = useStaticQuery(graphql`
      query {
        doctors: file(relativePath: {eq: "doctors.md"}) {
            id
            childMarkdownRemark {
              frontmatter {
                doctorcards {
                  id
                  name
                  designation
                  registation
                  mail
                  location
                  button1
                  button2
                  image {
                    childImageSharp {
                      fluid(quality: 10) {
                        src
                      }
                    }
                  }
                }
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
  return (
    <>
      <div id="doctors">
        <Top />
        <div id="doctor_container">
          <div id="doctor_search">
            <input type="search" placeholder="Search by name, specialization, phone number" />
            <div id="doctor_img_container">
              <img src={icon} alt="img1" />
            </div>
          </div>
        </div>
        <div id="doctors_cards_container">
          <p id="doctors_footer_title">{data.doctors.childMarkdownRemark.frontmatter.no_of_doctors}</p>
          <div id="doc_footer">
            <div id="doc_footer_block1">
              <p><span style={{ fontWeight: `600` }}>{data.doctors.childMarkdownRemark.frontmatter.note}</span>{data.doctors.childMarkdownRemark.frontmatter.note_description}</p>
            </div>
            <div id="doc_footer_block2">
              <img src={data.doctors.childMarkdownRemark.frontmatter.playstore.childImageSharp.fluid.src} alt="image1" />
              <img src={data.doctors.childMarkdownRemark.frontmatter.appstore.childImageSharp.fluid.src} alt="image2" />
            </div>
          </div>
          <div id="doc_all_cards">
            {data.doctors.childMarkdownRemark.frontmatter.doctorcards.map(doctorcards =>
              <div id="doc_card1">
                <div id="doc_card1_block1">
                  <div id="doc_card1_block1_image_container">
                    <img src={doctorcards.image.childImageSharp.fluid.src} alt="img1" />
                  </div>
                  <div id="doc_card1_block1_matter_container">
                    <p id="doc_card_title">{doctorcards.name}</p>
                    <div id="block_icon_container">
                      <div id="block_icon_container_container2">
                        <img src={icon1} alt="img1" id="cont_icon_img" />
                      </div>
                      <div id="block_icon_container_container">
                        <div>
                          <p>{doctorcards.designation}</p>
                        </div>
                      </div>
                    </div>
                    <div id="block_icon_container">
                      <div id="block_icon_container_container2">
                        <img src={icon2} alt="img1" id="cont_icon_img" />
                      </div>
                      <div id="block_icon_container_container">
                        <div>
                          <p>{doctorcards.registation}</p>
                        </div>
                      </div>
                    </div>
                    <div id="block_icon_container">
                      <div id="block_icon_container_container2">
                        <img src={icon3} alt="img1" id="cont_icon_img" />
                      </div>
                      <div id="block_icon_container_container">
                        <div>
                          <p>{doctorcards.mail}</p>
                        </div>
                      </div>
                    </div>
                    <div id="block_icon_container">
                      <div id="block_icon_container_container2">
                        <img src={icon4} alt="img1" id="cont_icon_img" />
                      </div>
                      <div id="block_icon_container_container">
                        <div>
                          <p>{doctorcards.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="doc_card1_block2">
                  <div>
                    <button id="doc_btn1">{doctorcards.button1}</button>
                  </div>
                  <div>
                    <button id="doc_btn2">{doctorcards.button2}</button>
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
export default Doctor;