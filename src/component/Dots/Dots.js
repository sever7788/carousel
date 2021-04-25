import React, { Component, useEffect } from "react";
import "./Dots.css";

const GalleryDotClassName = 'gallery-dot';
const GalleryDotActiveClassName = 'gallery-dot-active';
const GalleryDotsClassName = 'gallery-dots';

const Dots = (props) => {
    let currentSlide;
    props.currentSlide===undefined? currentSlide = 0:currentSlide = props.currentSlide;
       
    return (
        <div className={GalleryDotsClassName}>
            {
                Array.from(Array(props.size).keys()).map((key) => (
                    <button key={key} className={GalleryDotClassName + ' ' + (key === currentSlide ? GalleryDotActiveClassName : '')}></button>
                ))
            }
        </div>
    );
}

export default Dots;