import React, { useState, useEffect } from "react";
// import { navigate } from "gatsby";
import "../styles/Pay.scss";
import Top from "./nav";
import Footer from "./footer";
import { API_ROOT } from "gatsby-env-variables";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";

function Spotpay({ location }) {
  const [payment, setPayment] = useState(null)
  const proceedtopay = paymap => {
    const amount = paymap.AMOUNT
    const name = paymap.PLAN_NAME
    const orderid = paymap.PLAN_ID
    ;(async () => {
      const response2 = await fetch(
        API_ROOT + "/api/spotcare/paymentKey"
      )
      const data2 = await response2.json()
      console.log(data2)
      if (data2.status === true) {
        let options = {
          key: data2.key,
          amount: amount,
          order_id: orderid,
          name: name,
        }
        let result = await fetch( API_ROOT + "/api/payment/order", {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        result = await result.json()
        console.log(result)
        if(result.status === true){
        toast.success("Your Order Is Success")
        }else{
          toast.success("Please Try Again")
        }
      } else {
        return null
      }
    })()
  }

  useEffect(() => {
    const payments = async () => {
      try {
        const response = await fetch(
           API_ROOT + "/api/plans/registration"
        )
        const data = await response.json()
        setPayment(data)
      } catch (err) {}
    }

    payments()
  }, [])

  console.log(payment)

  const [toggleState, setToggleState] = useState(0)

  const toggleTab = index => {
    setToggleState(index)
  }
  // const getItems = () => {
  //     let userDetails = localStorage.getItem("UserDetaisl" );
  //     console.log(userDetails)
  //   }
  //   useEffect(() => {
  //     getItems();
  //     // eslint-disable-next-line
  //   }, [])
  // let name = location.state.item
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
                                  <p id="pay_prize">₹ 90</p>
                                </div>
                              </div>
                            </div>
                            <div id="pay_block2_cupon">
                              <input
                                type="text"
                                placeholder="Enter Promocode"
                              />
                              <p id="applybtn">APPLY</p>
                            </div>
                            <div id="pay_block2_mini">
                              <div id="pay_block2_mini_container">
                                <p id="prize_title">Total</p>
                              </div>
                              <div id="pay_block2_mini_container">
                                <p id="pay_prize">₹ {paymap.AMOUNT + 90}</p>
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
    </>
  )
}
export default Spotpay
