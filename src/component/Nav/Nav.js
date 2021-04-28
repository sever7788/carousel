import React from "react";
import "./Nav.css";
const CarouselNavClassName = 'carousel-nav';
const CarouselNavLeftClassName = 'carousel-left';
const CarouselNavRightClassName = 'carousel-right';
const Nav = (props) => {
    return (
        <div className={CarouselNavClassName}>
            <button className={CarouselNavLeftClassName} onClick={props.moveToLeft}>Left</button>
            <button className={CarouselNavRightClassName} onClick={props.moveToRight}>Right</button>
        </div>
    );
}

export default Nav;