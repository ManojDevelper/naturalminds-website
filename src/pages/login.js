import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import "../styles/Login.scss";
import bulb from "../data/assets/bulb.svg";
import Top from "./nav";
import Footer from "./footer";

function Login() {
    const [status, setStatus] = React.useState(true)
    const data = useStaticQuery(graphql`
      query {
        login: file(relativePath: {eq: "login.md"}) {
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
                  inputtitle
                  placeholder
                }
                register {
                  inputtitle
                  placeholder
                }
              }
            }
          }
         }
    `)
    return (
        <>
            <div id="login_main">
                <Top />
                {
                    status ?
                        <div id="login">
                            <div id="login_container_container">
                                <div id="login_container">
                                    <div id="login_block1">
                                        <div id="login_block1_block1">
                                            <h1>{data.login.childMarkdownRemark.frontmatter.logintitle}</h1>
                                        </div>
                                        <div id="login_block1_block2">
                                            <p>{data.login.childMarkdownRemark.frontmatter.loginuser} <span onClick={() => setStatus(false)} role="presentation">{data.login.childMarkdownRemark.frontmatter.loginregister}</span></p>
                                        </div>
                                    </div>
                                    <div id="inputs">
                                    {data.login.childMarkdownRemark.frontmatter.login.map(login =>
                                        <div id="input_block2">
                                            <div id="input_block_input1" active-class="input_block_input1">
                                                <h1>{login.inputtitle}</h1>
                                                <input type="text" placeholder={login.placeholder} />
                                            </div>
                                        </div>
                                    )}
                                        <div id="input_block3">
                                            <button>{data.login.childMarkdownRemark.frontmatter.loginbutton}</button>
                                        </div>
                                    </div>
                                </div>
                                <div id="login_note">
                                    <p id="login_note1"><img src={bulb} alt="bulb" />{data.login.childMarkdownRemark.frontmatter.loginnote}</p>
                                    <p id="login_note2">{data.login.childMarkdownRemark.frontmatter.logindescription}</p>
                                    <p id="login_note3">{data.login.childMarkdownRemark.frontmatter.logingetapp}</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div id="login">
                            <div id="register_container">
                                <div id="register_container_head">
                                    <div id="register_container_head_block1">
                                        <h1>{data.login.childMarkdownRemark.frontmatter.registertitle}</h1>
                                    </div>
                                    <div id="register_container_head_block2">
                                        <p>{data.login.childMarkdownRemark.frontmatter.registermember} <span onClick={() => setStatus(true)} role="presentation">{data.login.childMarkdownRemark.frontmatter.registerlogin}</span></p>
                                    </div>
                                </div>
                                <div id="register_inputs">
                                {data.login.childMarkdownRemark.frontmatter.register.map(register =>
                                    <div id="register_input_block1">
                                        <div id="register_input_block_input1">
                                            <h1>{register.inputtitle}</h1>
                                            <input type="text" placeholder={register.placeholder} />
                                        </div>
                                    </div>
                                    )}
                                  </div>
                                <div id="register_checkbox">
                                    <input type="checkbox" />
                                    <p>{data.login.childMarkdownRemark.frontmatter.registertermdescription1} <span>{data.login.childMarkdownRemark.frontmatter.registertermdescription2}</span></p>
                                </div>
                                <div id="register_button">
                                    <button>{data.login.childMarkdownRemark.frontmatter.registerbutton}</button>
                                </div>
                            </div>
                        </div>
                }
                <Footer />
            </div>
        </>
    );
};
export default Login;