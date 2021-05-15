import React, { useState, useEffect } from "react";
import { graphql, navigate, useStaticQuery } from "gatsby";
import "../styles/Login.scss";
import Top from "./nav";
import Footer from "./footer";
import { API_ROOT } from "gatsby-env-variables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Register() {
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
          }
        }
      }
    }
  `)
  /*=======================tnc modal======================================*/
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  /*=================form validation=======================================*/
  const [errors, setErrors] = useState("");
  const validation = () => {
    let errors = {};
    if (!name) {
      errors.name = "**Name is Required"
      errors.color = "red"
    } else {
      errors.name = ""
    } if (!email) {
      errors.email = "**Please enter your Email"
      errors.color = "red"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "**Email is invalid"
      errors.color = "red"
    }
    if (!phone) {
      errors.phone = "**Please enter your mobile number"
      errors.color = "red"
    }
    if (!licenseNo) {
      errors.licenseNo = "**Please enter your licenseNo"
      errors.color = "red"
    }
    if (!docType) {
      errors.docType = "**Please select docType"
      errors.color = "red"
    }
    if (!orgName) {
      errors.orgName = "**Please enter your organisation name"
      errors.color = "red"
    }
    if (!orgPhone) {
      errors.orgPhone = "**Please enter your organisation number"
      errors.color = "red"
    }
    if (!address) {
      errors.address = "**Please enter your address"
      errors.color = "red"
    } if (!city) {
      errors.city = "**Please enter your city"
      errors.color = "red"
    } if (!state) {
      errors.state = "**Please enter your state"
      errors.color = "red"
    } if (!pincode) {
      errors.pincode = "**Please enter your pincode"
      errors.color = "red"
    }
    return errors;
  }

  /*-------------------------------------------------------------------------*/
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [phone, setPhone] = useState("")
  const [licenseNo, setLicenseno] = useState("")
  const [docType, setDocType] = useState("")
  const [orgName, setOrgname] = useState("")
  const [orgPhone, setOrgphone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [pincode, setPincode] = useState("")
  const [refferalCode, setRefferalcode] = useState("")
  const [selectedUserType, setSelectedUserType] = useState("")
  const [tnc_id, setTnc] = useState(false)
  const [showData, setShowData] = useState([])

  async function signUp() {
    const orgId = 0;
    let item = { name, email, phone, licenseNo, gender, orgName, orgPhone, docType, address, pincode, state, city, refferalCode, tnc_id, selectedUserType, orgId }

    let result = await fetch(
      API_ROOT + "/api/SpotCare/signup",
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
    console.log(result)
    setShowData(result)
    if (result.status === true) {
      toast.success("Registation Success")
      navigate("/spotPay/", {
        state: {
          item: item,
          item2: result
        }
      })
    } else {
      toast.error(result.msg || result.message)
    }
  }
  function signUpp() {
    setErrors(validation())
    navigate("/register/")
  }
  /*================to clear up all the results in the register form================*/
  const [docResult, setDocResult] = useState("")
  function signUps() {
    setName("")
    setEmail("")
    setGender("")
    setPhone("")
    setLicenseno("")
    setDocType("")
    setOrgname("")
    setOrgphone("")
    setAddress("")
    setCity("")
    setCity("")
    setState("")
    setPincode("")
    setRefferalcode("")
    setShowData("")
    setShowData("")
  }
  // const [posts, setPosts] = useState();

  // useEffect(() => {
  //   const loadPosts = async () => {
  //     const response = await axios.get("https://stag.spotcare.in/api/tou/termsofuse.html");
  //     setPosts(response);
  //     console.log(response)
  //   }
  //   loadPosts();
  //    // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    const loadPosts = async () => {
      const response2 = await fetch(
        "https://stag.spotcare.in/api/tou/termsofuse.html"
      )
      const data2 = await response2.json()
      console.log(data2)

    }
    loadPosts()
  }, [])
  /*====================for Specelist======================*/
  async function getDoctor() {
    let docitem = { name }

    let DocTypeResult = await fetch(
      API_ROOT + "/api/SpotCare/doctorType",
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
    console.log(DocTypeResult)
    setDocResult(DocTypeResult)
  }
  useEffect(() => {
    getDoctor();
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <div id="login_main">
        <Top />
        <div id="login">
          <div id="register_container">
            <div id="register_container_head">
              <div id="register_container_head_block1">
                {/* <h1 dangerouslySetInnerHTML={{ __html: posts }} ></h1> */}
                <h1>
                  {data.login.childMarkdownRemark.frontmatter.registertitle}
                </h1>
              </div>
              <div id="register_container_head_block2">
                <p>
                  {data.login.childMarkdownRemark.frontmatter.registermember}
                  <a href="https://www.spotcare.in/auth/login" target="_blank" rel="noreferrer"><span>
                    {data.login.childMarkdownRemark.frontmatter.registerlogin}
                  </span></a>
                </p>
              </div>
            </div>
            <div id="register_inputs">
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(name.length < 3) ? (<h1 style={{ color: (errors.color) }}>Full Name**</h1>) : (<h1>Full Name**</h1>)}
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onBlur={""}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(!email) || (!/\S+@\S+\.\S+/.test(email)) ? (<h1 style={{ color: (errors.color) }}>Email ID**</h1>) : (<h1>Email ID**</h1>)}
                  <input
                    type="Email"
                    placeholder="mail"
                    value={email}
                    onBlur={""}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div id="docselectorbox">
                {(!gender) ? (<h1 style={{ color: (errors.color) }}>Gender*</h1>) : (<h1>Gender*</h1>)}
                <select
                  className="custom-select"
                  value={gender}
                  onBlur={""}
                  onChange={e => {
                    const selectedDoctor = e.target.value
                    setGender(selectedDoctor)
                  }}
                ><option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(!phone) ? (<h1 style={{ color: (errors.color) }}>Contact Number*</h1>) : (<h1>Contact Number*</h1>)}
                  <input
                    type="text"
                    placeholder="+ 91"
                    value={phone}
                    onBlur={""}
                    onChange={e => setPhone(parseInt(e.target.value) || "")}
                    maxLength={12}
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
                  {(licenseNo.length < 5) ? (<h1 style={{ color: (errors.color) }}>License Number*</h1>) : (<h1>License Number*</h1>)}
                  <input
                    type="text"
                    placeholder="license number"
                    value={licenseNo}
                    onBlur={""}
                    onChange={e => setLicenseno(e.target.value)}
                    maxLength={15}
                    minLength={8}
                    onKeyPress={event => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault()
                      }
                    }}
                  />
                </div>
              </div>
              <div id="docselectorbox">
                {(!selectedUserType) ? (<h1 style={{ color: (errors.color) }}>User Type**</h1>) : (<h1>User Type**</h1>)}
                <select
                  className="custom-select"
                  value={selectedUserType}
                  onBlur={""}
                  onChange={e => {
                    const selectedDoctor = e.target.value
                    setSelectedUserType(selectedDoctor)
                  }}
                ><option value="">User Type</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Chemist">Chemist</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>
              {(selectedUserType === "Doctor") ? (<div id="docselectorbox">
                {(!docType) ? (<h1 style={{ color: (errors.color) }}>Speciality</h1>) : (<h1>Speciality</h1>)}
                <select
                  className="custom-select"
                  value={docType}
                  onBlur={""}
                  onChange={e => {
                    const selectedDoctor = parseInt(e.target.value)
                    setDocType(selectedDoctor)
                  }}
                >
                  <option value="">Select Speciality</option>
                  {docResult &&
                    docResult.data.map((Specelist, i) => (
                      <>
                        {(Specelist.name === "Doctor" || Specelist.name === "Nurse" || Specelist.name === "Chemist" || Specelist.name === "Laboratory") ? (<></>) : (<option value={Specelist.id} key={Specelist.id}>
                          {Specelist.name}
                        </option>)}

                      </>
                    ))}
                </select>
              </div>) :
                (<>
                </>)}
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(orgName < 3) ? (<h1 style={{ color: (errors.color) }}>Provider Organization*</h1>) : (<h1>Provider Organization*</h1>)}
                  <input
                    type="text"
                    placeholder="provider organization"
                    value={orgName}
                    onBlur={""}
                    onChange={e => setOrgname(e.target.value)}
                  />
                </div>
              </div>
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(orgPhone < 3) ? (<h1 style={{ color: (errors.color) }}>Provider Organization Phone Number*</h1>) : (<h1>Provider Organization Phone Number*</h1>)}
                  <input
                    type="text"
                    placeholder="orgPhone"
                    value={orgPhone}
                    onBlur={""}
                    onChange={e => setOrgphone(parseInt(e.target.value) || "")}
                    maxLength={12}
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
                  {(address < 3) ? (<h1 style={{ color: (errors.color) }}>Provider Address*</h1>) : (<h1>Provider Address*</h1>)}
                  <input
                    type="text"
                    placeholder="provider address"
                    value={address}
                    onBlur={""}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(city.length < 3) ? (<h1 style={{ color: (errors.color) }}>City*</h1>) : (<h1>City*</h1>)}
                  <input
                    type="text"
                    placeholder="city"
                    value={city}
                    onBlur={""}
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
              </div>
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(state.length < 3) ? (<h1 style={{ color: (errors.color) }}>State</h1>) : (<h1>State</h1>)}
                  <input
                    type="text"
                    placeholder="state"
                    value={state}
                    onBlur={""}
                    onChange={e => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="register_input_block1">
                <div id="register_input_block_input1">
                  {(pincode.length < 3) ? (<h1 style={{ color: (errors.color) }}>PinCode</h1>) : (<h1>PinCode</h1>)}
                  <input
                    type="text"
                    placeholder="pincode"
                    value={pincode}
                    onBlur={""}
                    onChange={e => setPincode(e.target.value)}
                    maxLength={7}
                    minLength={6}
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
                  <h1>Referral (if any)</h1>
                  <input
                    type="text"
                    placeholder="Referral (if any)"
                    value={refferalCode}
                    onBlur={""}
                    onChange={e => setRefferalcode(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div id="register_checkbox">
              <input type="checkbox" value={showData.tnc_id} onChange={e => setTnc(e.target.checked)} />
              <p>By signing up, I accept NaturalMinds’s <span onClick={handleClickOpen('paper')} role="presentation">Terms and conditions</span></p>
            </div>
            <div id="register_button">
              {(!name || !email || (!/\S+@\S+\.\S+/.test(email)) || !gender || !selectedUserType || (!phone || phone.length < 9) || !licenseNo || !orgName || (!orgPhone || orgPhone.length < 9) || !address || !city || !state || !pincode || !tnc_id) ? (
                <button type="submit" onClick={signUpp} style={{ background: `gray` }}>SignUp</button>
              ) : (
                <>
                  <button type="submit" onClick={signUp}>SignUp</button>
                </>
              )}
              <button type="submit" onClick={signUps} style={{ background: `transparent`, color: `blue`, width: `fit-content`, marginLeft: `1vw` }}>clear</button>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
      {/* ===================================Terms and conditions Dialouge modal============================================== */}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        role="presentation">
        <DialogTitle id="scroll-dialog-title" style={{ textAlign: `center`, fontWeight: `bold`, color: "#00bde1" }}>Terms & Conditions</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Register;