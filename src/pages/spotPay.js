import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import "../styles/Pay.scss";
import Top from "./nav";
import Footer from "./footer";
import axios from "axios";

function Spotpay({ location }) {
    /*=================payment selection=================*/
    const [payment, setPayment] = useState("");
    const payments = async () => {
        const response = await fetch("https://stag.spotcare.in/api/plans/registration");
        const data = await response.json();
        setPayment(data)
    }
    /*==========================proceed to pay======================*/
    const proceedtopay = async () => {
        const response2 = await fetch("https://stag.spotcare.in/api/spotcare/paymentKey");
        const data2 = await response2.json();
        console.log(data2)
        {
            if (data2.status === true) {
                alert(data2.status)
                // navigate("/register/", {
                //   })
                    async function proceedtopay2() {
        let item = data2.key
        let result = await fetch(
            "https://stag.spotcare.in/api/payment/order",
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
    }
            } else {
                return null
            }
        }

    }

    useEffect(() => {
        payments();
    }, [])

    const [toggleState, setToggleState] = useState(0);

    const toggleTab = (index) => {
        setToggleState(index);
    };
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
                                {/* {
                                    payment && payment.map((paymap, i) => 
                                    <>
                                    <p>{paymap.data.PLAN_ID}</p>
                                    </>
                                    )} */}
                            </div>
                            <div id="pay_block2">
                                <div id="pay_block2_container1_wrapper" >
                                    <div className={toggleState === 1 ? "pay_block2_container1 pay_block2_container2" : "pay_block2_container1"}
                                        onClick={() => toggleTab(1)} role="presentation">
                                        <div id="success">
                                            <p>success</p>
                                        </div>
                                        <div id="pay_block2_container1_block1">
                                            <p id="plantype">MONTHLY</p>
                                            <p id="amount">₹ 550</p>
                                            <p id="permonth">Per Month</p>
                                        </div>
                                    </div>
                                    <div className={toggleState === 2 ? "pay_block2_container1 pay_block2_container2" : "pay_block2_container1"}
                                        onClick={() => toggleTab(2)} role="presentation">
                                        <div id="success">
                                            <p>success</p>
                                        </div>
                                        <div id="pay_block2_container1_block1">
                                            <p id="plantype">ANNUAL</p>
                                            <p id="amount">₹ 6600</p>
                                            <p id="permonth">Per Year</p>
                                        </div>
                                    </div>
                                </div>
                                <div id="pay_block2_container2">
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
                                                    <p id="pay_prize">₹ 550</p>
                                                </div>
                                            </div>
                                            <div id="pay_block2_mini">
                                                <div id="pay_block2_mini_container">
                                                    <p id="prize_title">GST</p>
                                                </div>
                                                <div id="pay_block2_mini_container">
                                                    <p id="pay_prize">₹ 99</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div id="pay_block2_cupon">
                                            <input type="text" placeholder="Enter Promocode" />
                                            <p id="applybtn">APPLY</p>
                                        </div>
                                        <div id="pay_block2_mini">
                                            <div id="pay_block2_mini_container">
                                                <p id="prize_title">Total</p>
                                            </div>
                                            <div id="pay_block2_mini_container">
                                                <p id="pay_prize">₹ 649</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="pay_block2_container2_block1_btn">
                                        <button onClick={proceedtopay}>Proceed to Pay</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};
export default Spotpay;