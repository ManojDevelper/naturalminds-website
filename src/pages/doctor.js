import React, { useState, useEffect } from "react"
import "../styles/Doctor.scss"
import icon1 from "../data/assets/find_doc1.svg"
import icon2 from "../data/assets/find_doc2.svg"
import icon3 from "../data/assets/find_doc3.svg"
import icon4 from "../data/assets/find_doc4.svg"
import icon from "../data/assets/searchwhite.svg"
import male from "../data/assets/male.png"
import female from "../data/assets/female.jpeg"
import { graphql, useStaticQuery } from "gatsby"
import Top from "./nav"
import _ from "lodash"

function Doctor() {
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
  const [filterValue, setFilterValue] = useState("")
  const [final, setFinal] = useState("")
  const inputValue = event => {
    const data = event.target.value
    console.log(data)
    setFilterValue(data)
  }
  async function search() {
    let item = { filterValue }

    let result = await fetch(
      "https://stagpay.spotcare.in/apinm/api/searchDoctors",
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
    search()
    // eslint-disable-next-line
  },[])
  return (
    <>
      <div id="doctors">
        <Top />
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
              <img
                src={data.doctors.childMarkdownRemark.frontmatter.playstore.childImageSharp.fluid.src} alt="image1" id="doc_store1"/>
              <img src={data.doctors.childMarkdownRemark.frontmatter.appstore.childImageSharp.fluid.src} alt="image2" />
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
                          {key.gender.toLowerCase() === "male" || key.gender.toLowerCase() === "m" || !_.isEmpty(key.gender) ? (<img src={male} alt="male" />) : (
                            <img src={female} alt="female" />
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
                    <div>
                      <button id="doc_btn2">GetApp</button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
export default Doctor
