import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import "../styles/Login.scss"
import bulb from "../data/assets/bulb.svg"
import Top from "./nav"
import Footer from "./footer"

function Login() {
  const [status, setStatus] = React.useState(true)
  const data = useStaticQuery(graphql`
    query {
      login: file(relativePath: { eq: "login.md" }) {
        id
        childMarkdownRemark {
          frontmatter {
            logintitle
            loginuser
            loginregister
            loginbutton
            loginnote
            logindescription
            logingetapp
            registertitle
            registermember
            registerlogin
            registertermdescription1
            registertermdescription2
            registerbutton
            login {
              id
              inputtitle
              placeholder
            }
          }
        }
      }
    }
  `)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState()
  const [licenseNo, setLicenseno] = useState("")
  const [docType, setDocType] = useState("")
  const [orgName, setOrgname] = useState("")
  const [orgPhone, setOrgphone] = useState()
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [refferalCode, setRefferalcode] = useState("")
  const [showData, setShowData] = useState("")

  async function signUp() {
    let item = { name, email, phone, licenseNo, gender, orgName, orgPhone, docType, address, pincode, state, city, refferalCode }

    let result = await fetch("https://stag.spotcare.in/api/SpotCare/signup", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
    result = await result.json()
    setShowData(result)
    // if (result) {
    //   setShowData(true)
    // }
    console.log(showData)
    alert(showData.msg)
  }
  /*====================for Specelist======================*/
  const [docResult, setDocResult] = useState("")
  async function getDoctor() {
    let docitem = { name }

    let DocTypeResult = await fetch(
      "https://dev.spotcare.in/api/SpotCare/doctorType",
      {
        method: "POST",
        body: JSON.stringify(docitem),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    DocTypeResult = await DocTypeResult.json()
    setDocResult(DocTypeResult)
  }
  useEffect(() => {
    getDoctor()
  }, [])
  return (
    <>
      <div id="login_main">
        <Top />
        {status ? (
          <div id="login">
            <div id="login_container_container">
            <form>
              <div id="login_container">
                <div id="login_block1">
                  <div id="login_block1_block1">
                    <h1>
                      {data.login.childMarkdownRemark.frontmatter.logintitle}
                    </h1>
                  </div>
                  <div id="login_block1_block2">
                    <p>
                      {data.login.childMarkdownRemark.frontmatter.loginuser}{" "}
                      <span onClick={() => setStatus(false)} role="presentation">
                        {data.login.childMarkdownRemark.frontmatter.loginregister}
                      </span>
                    </p>
                  </div>
                </div>
                <div id="inputs">
                    <div id="input_block2">
                      <div id="input_block_input1" active-class="input_block_input1">
                        <h1>User Name**</h1>
                        <input type="text" placeholder="E-mail" />
                      </div>
                    </div>
                    <div id="input_block2">
                      <div id="input_block_input1" active-class="input_block_input1">
                        <h1>Password**</h1>
                        <input type="password" placeholder="Password" />
                      </div>
                    </div>
                  <div id="input_block3">
                    <button>
                      {data.login.childMarkdownRemark.frontmatter.loginbutton}
                    </button>
                  </div>
                </div>
              </div>
              </form>
              <div id="login_note">
                <p id="login_note1">
                  <img src={bulb} alt="bulb" />
                  {data.login.childMarkdownRemark.frontmatter.loginnote}
                </p>
                <p id="login_note2">
                  {data.login.childMarkdownRemark.frontmatter.logindescription}
                </p>
                <p id="login_note3">
                  {data.login.childMarkdownRemark.frontmatter.logingetapp}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /*==========================register form===================*/
          <div id="login">
            <div id="register_container">
              <div id="register_container_head">
                <div id="register_container_head_block1">
                  <h1>
                    {data.login.childMarkdownRemark.frontmatter.registertitle}
                  </h1>
                </div>
                <div id="register_container_head_block2">
                  <p>
                    {data.login.childMarkdownRemark.frontmatter.registermember}{" "}
                    <span onClick={() => setStatus(true)} role="presentation">
                      {data.login.childMarkdownRemark.frontmatter.registerlogin}
                    </span>
                  </p>
                </div>
              </div>
              <div id="register_inputs">
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>Full Name*</h1>
                    <input
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>Email ID**</h1>
                    <input
                      type="Email"
                      placeholder="mail"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div id="docselectorbox">
                  <h1>Gender*</h1>
                  <select
                    className="custom-select"
                    value={gender}
                    onChange={e => {
                      const selectedDoctor = e.target.value
                      setGender(selectedDoctor)
                    }}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>Contact Number*</h1>
                    <input
                      type="text"
                      placeholder="91"
                      value={phone}
                      onChange={e => setPhone(parseInt(e.target.value) || "")}
                      maxLength={10}
                      minLength={10}
                      onKeyPress={event => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>License Number*</h1>
                    <input
                      type="text"
                      placeholder="license number"
                      value={licenseNo}
                      onChange={e => setLicenseno(e.target.value)}
                    />
                  </div>
                </div>
                <div id="docselectorbox">
                  <h1>Speciality</h1>
                  <select
                    className="custom-select"
                    value={docType}
                    onChange={e => {
                      const selectedDoctor = parseInt(e.target.value)
                      setDocType(selectedDoctor)
                    }}
                  >
                    <option value="">Select Speciality</option>
                    {docResult &&
                      docResult.data.map((Specelist, i) => (
                        <>
                          <option value={Specelist.id} key={Specelist.id}>
                            {Specelist.name}
                          </option>
                        </>
                      ))}
                  </select>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>Provider Organization*</h1>
                    <input
                      type="text"
                      placeholder="provider organization"
                      value={orgName}
                      onChange={e => setOrgname(e.target.value)}
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>Provider Organization Phone Number*</h1>
                    <input
                      type="text"
                      placeholder="provider organization phone number"
                      value={orgPhone}
                      onChange={e =>
                        setOrgphone(parseInt(e.target.value) || "")
                      }
                      maxLength={10}
                      minLength={10}
                      onKeyPress={event => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault()
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>Provider Address*</h1>
                    <input
                      type="text"
                      placeholder="provider address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>City*</h1>
                    <input
                      type="text"
                      placeholder="city"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>State</h1>
                    <input
                      type="text"
                      placeholder="state"
                      value={state}
                      onChange={e => setState(e.target.value)}
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>PinCode</h1>
                    <input
                      type="text"
                      placeholder="pincode"
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                    />
                  </div>
                </div>
                <div className="register_input_block1">
                  <div id="register_input_block_input1">
                    <h1>Referral (if any)</h1>
                    <input
                      type="text"
                      placeholder="Referral (if any)"
                      value={refferalCode}
                      onChange={e => setRefferalcode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div id="register_checkbox">
                <input type="checkbox" />
                <p>By signing up, I accept NaturalMinds’s <span>Terms and conditions</span></p>
              </div>
              <div id="register_button">
                <button type="submit"onClick={signUp} >SignUp</button>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  )
}
export default Login
