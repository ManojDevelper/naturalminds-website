import React from "react"
import "../styles/Ourcustomers.scss"
import { graphql, useStaticQuery } from "gatsby"
import img2 from "../data/assets/quatation.svg"
import img3 from "../data/assets/pause.png"
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Ourcustomers() {
  const data = useStaticQuery(graphql`
      query {
        ourcustomers: file(relativePath: {eq: "ourcustomers.md"}) {
            childMarkdownRemark {
              frontmatter {
                title
                ourcustomers{
                    id
                  name
                  location
                  title
                  review
                  image {
                    childImageSharp {
                      fluid(quality: 1) {
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
      <div className="ourcustomers">
        <h1>{data.ourcustomers.childMarkdownRemark.frontmatter.title}</h1>
        <Carousel>
          {data.ourcustomers.childMarkdownRemark.frontmatter.ourcustomers.map(ourcustomers =>
            <Carousel.Item>
              <div className='ourcustomers_container'>
                <div className="ourcustomers_video">
                  <img src={img3} alt="img1" id="playbtn" />
                  <img src={ourcustomers.image.childImageSharp.fluid.src} alt="img1" id="video_img" />
                </div>
                <div className="ourcustomers_matter">
                  <img src={img2} alt="quatation" id="quatation" />
                  <div className="ourcustomers_matter_head">
                    <h2>{ourcustomers.title}</h2>
                    <p>{ourcustomers.review}</p>
                  </div>
                  <div className="ourcustomers_doc_details">
                    <p id="doc_name">{ourcustomers.name}</p>
                    <p id="doc_address">{ourcustomers.location}</p>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          )}
        </Carousel>
      </div>

    </>
  );
};
export default Ourcustomers;