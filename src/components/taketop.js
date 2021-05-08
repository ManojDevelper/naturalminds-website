import React from "react"; 
import takebtn from "../data/assets/taketop.svg";
import Link from "gatsby";

function Taketop(){
    return(
        <>
        <Link to= "/banner/"><img src={takebtn} alt="taketop" style={{width: `70px`, cursor: `pointer`, borderRadius: `50%`, position: `absolute`, right: `2vw`, bottom: `3vw`}}/></Link>
        </>
    );
};
export default Taketop;