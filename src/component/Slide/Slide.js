import React from "react";
import "./Slide.css";

const Slide = (props) => {
    return (
        <div className="carousel-slide">
            <div className="slide">
                {props.u}
            </div>
        </div>
    );
}

export default Slide;