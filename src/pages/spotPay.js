import React, { useState } from "react";
import "../styles/Pay.scss";
import Top from "./nav";
import Footer from "./footer";

function Spotpay({location}) {
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
    //let name = location.state.item
   // console.log(name)
    return (
        <>
        <div id="login_main">
        <Top/>
            <div id="pay">
                <div id="pay_container_main">
                    <div id="pay_container">
                        <div id="pay_block1">
                            <h1>Membership Plans</h1>
                        </div>
                        <div id="pay_block2">
                        <div id="pay_block2_container1_wrapper">
                            <div className={toggleState === 1 ? "pay_block2_container1 pay_block2_container2" : "pay_block2_container1"}
                                onClick={() => toggleTab(1)} role="presentation">
                                <div id="pay_block2_container1_block1">
                                    <p id="plantype">MONTHLY</p>
                                    <p id="amount">₹ 550</p>
                                    <p id="permonth">Per Month</p>
                                </div>
                            </div>
                            <div className={toggleState === 2 ? "pay_block2_container1 pay_block2_container2" : "pay_block2_container1"}
                                onClick={() => toggleTab(2)} role="presentation">
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
                                        <input type="text" placeholder="Enter Promocode"/>
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
                                        <button>Proceed to Pay</button>
                                    </div>
                              </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
            </div>
        </>
    );
};
export default Spotpay;