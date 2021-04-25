import React from "react";
import "./Slide.css";

const Slide = (props) => {
    return (
        <div className="gallery-slide">
            <div className="slide">
                <img src={props.src} alt="Вечерняя природа" />
            </div>
        </div>
    );
}

export default Slide;