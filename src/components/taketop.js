import React from "react"; 
import takebtn from "../data/assets/taketop.svg";
import Link from "gatsby";

function Taketop(){
    return(
        <>
        <div id="image_taketop">
        <Link to= "/banner/"><img src={takebtn} alt="taketop" style={{width: `70px`, cursor: `pointer`, borderRadius: `50%`, position: `absolute`, right: `2vw`, bottom: `3vw`}}/></Link>
        </div>
        </>
    );
};
export default Taketop;