import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import "../styles/Pay.scss";
import Top from "./nav";
import Footer from "./footer";
import { API_ROOT } from "gatsby-env-variables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from "../images/logo.png";
import axios from "axios";
import "../styles/Success.scss";
import tick from "../images/tick.gif";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


function loadscript(src) {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}
function Spotpay({ location }) {
  /*===========================successpop====================*/
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  function handleClickclose() {
    navigate("/landing/")
  }
  /*===================getting data from registation==========================================*/
  let registerDetails =''
  let registerSuccessDetails =''
  if(location.state)
{
   registerDetails = location.state.item
   registerSuccessDetails = location.state.item2
}
  console.log(registerSuccessDetails)
  /*=========================================================================================*/
  const [payment, setPayment] = useState(null)
  // if (final.status === true) {
  //   const actualamount = final.finalAmount
  // } else {
  //   const actualamount = paymap.AMOUNT + paymap.AMOUNT / 100 * 18
  // }
  const proceedtopay = paymap => {
    const amount = final.status === true ? final.data.finalAmount : paymap.AMOUNT + paymap.AMOUNT / 100 * 18
    const planname = paymap.PLAN_NAME
    const orderid = paymap.PLAN_ID
      ; (async () => {
        const response2 = await fetch(
          API_ROOT + "/api/spotcare/paymentKey"
        )
        const data2 = await response2.json()
        console.log(data2)
        if (data2.status === true) {
          let optionss = {
            key: data2.key,
            amount: amount,
            order_id: orderid,
            name: planname,
          }
          console.log(optionss)
          let result = await fetch(API_ROOT + "/api/payment/order", {
            method: "POST",
            body: JSON.stringify(optionss),
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          })
          result = await result.json()
          console.log(result.data)
          if (result.status === true) {
            const res = await loadscript("https://checkout.razorpay.com/v1/checkout.js")
            if (!res) {
              toast.alert("Razorpay SDK failed to load")
              return
            }
            const options = {
              key: data2.key,
              doctor_id: registerDetails.docType,
              selectedUserType: registerDetails.selectedUserType,
              code: '',
              paymentMode: 'online',
              planId: orderid,
              paymentFor: 'Registration',
              amount: amount,
              currency: "INR",
              name: "Natural Minds",
              description: "Adding value to the lives",
              image: { logo },
              order_id: result.data,
              handler: async function (response) {
                const handlerData = {
                  orgId: registerSuccessDetails.orgId,
                  doctor_id: registerSuccessDetails.userId,
                  selectedUserType: registerDetails.selectedUserType,
                  code: '',
                  paymentMode: 'online',
                  planId: orderid,
                  paymentFor: 'Registration',
                  order_id: result.data,
                  amount: amount,
                };
                Object.assign(handlerData, response)
                console.log(handlerData);
                const handlerResult = await axios.post(API_ROOT + "/api/payment", handlerData);
                console.log(handlerResult)
                if (handlerResult.data.status === true) {
                  handleClickOpen()
                } else {
                  toast.error("Please try again")
                }
              },
              theme: {
                color: 'linear-gradient(135deg, #00bde1 0%, #0093c6 100%)'
              },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.open()
            console.log(paymentObject)
          } else {
            toast.error("Please Try Again")
          }
        } else {
          return null
        }
      })()
      if (!coupon){
        setFinal("")
      }
  }

  useEffect(() => {
    const payments = async () => {
      try {
        const response = await fetch(
          API_ROOT + "/api/plans/registration"
        )
        const data = await response.json()
        setPayment(data)
        console.log(data)
      } catch (err) { }
    }

    payments()
  }, [])
  /*=======================coupon code=======================*/
  const [coupon, setCoupon] = useState(null)
  const [final, setFinal] = useState("")
  const refferalCode = registerDetails.refferalCode;

  async function couponapply(paymap) {
    const planId = paymap.PLAN_ID
    let couponitem = { refferalCode, coupon, planId }
    console.log(couponitem)
    let couponResult = await fetch(
      API_ROOT + "/api/payment/coupon",
      {
        method: "POST",
        body: JSON.stringify(couponitem),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
    couponResult = await couponResult.json()
    console.log(couponResult)
    setFinal(couponResult)
    console.log(final)
    if (couponResult.status === true) {
      toast.success("Coupon Applied Successfully")
    } else {
      toast.error(couponResult.msg)
    }
  }

  const [toggleState, setToggleState] = useState(0)

  const toggleTab = index => {
    setToggleState(index)
  }
  return (
    <>
      <div id="login_main">
        <Top />
        <div id="pay">
          <div id="pay_container_main">
            <div id="pay_container">
              <div id="pay_block1">
                <h1>Membership Plans</h1>
              </div>
              <div id="pay_block2">
                <div id="pay_block2_container1_wrapper">
                  {payment &&
                    payment.data.map((paymap, i) => (
                      <div
                        key={i}
                        className={
                          toggleState === i
                            ? "pay_block2_container1 pay_block2_container2"
                            : "pay_block2_container1"
                        }
                        onClick={() => toggleTab(i)}
                        role="presentation"
                      >
                        <div id="success">
                          <p>SELECTED</p>
                        </div>
                        <div id="pay_block2_container1_block1">
                          <p id="plantype">{paymap.PLAN_NAME}</p>
                          <p id="amount">₹ {paymap.AMOUNT}</p>
                          <p id="permonth">Per Month</p>
                        </div>
                      </div>
                    ))}
                </div>
                {payment &&
                  payment.data.map((paymap, i) => (
                    <>
                      {toggleState === i && (
                        <div id="pay_block2_container2" key={i}>
                          <div id="pay_block2_container2_block1">
                            <div id="pay_block2_container2_block1_title">
                              <h1>Summary</h1>
                            </div>
                            <div id="pay_block2_mini_main">
                              <div id="pay_block2_mini">
                                <div id="pay_block2_mini_container">
                                  <p id="prize_title">Sub Total</p>
                                </div>
                                <div id="pay_block2_mini_container">
                                  <p id="pay_prize">₹ {paymap.AMOUNT}</p>
                                </div>
                              </div>
                              <div id="pay_block2_mini">
                                <div id="pay_block2_mini_container">
                                  <p id="prize_title">GST</p>
                                </div>
                                <div id="pay_block2_mini_container">
                                  <p id="pay_prize">₹ {paymap.AMOUNT * 0.18}</p>
                                </div>
                              </div>
                            </div>
                            <div id="pay_block2_cupon">
                              <input
                                type="text"
                                value={coupon}
                                placeholder="Enter Promocode"
                                onChange={e => setCoupon(e.target.value)}
                              />
                              <p id="applybtn" onClick={() => { couponapply(paymap) }}>APPLY</p>
                            </div>
                            <div id="pay_block2_mini">
                              <div id="pay_block2_mini_container">
                                <p id="prize_title">Total</p>
                              </div>
                              <div id="pay_block2_mini_container">
                                {final.status === true ? <p id="pay_prize">₹ {final.data.finalAmount}</p> : <p id="pay_prize">₹ {paymap.AMOUNT + paymap.AMOUNT / 100 * 18}</p>}
                              </div>
                            </div>
                          </div>
                          <div id="pay_block2_container2_block1_btn">
                            <button
                              onClick={() => {
                                proceedtopay(paymap)
                              }}
                            >
                              Proceed to Pay
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div id="tick">
              <div id="popuptitle">
                <h1>Registration Successful</h1>
                <p>Please check your registered email for your login credentials!</p>
              </div>
              <img src={tick} alt="img" />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ background: `#00b3db`, color: `white` }} onClick={handleClickclose}>
            ok
          </Button>
        </DialogActions>
      </Dialog>

    </>
  )
}
export default Spotpay
