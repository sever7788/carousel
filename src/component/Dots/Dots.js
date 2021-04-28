import React, { Component, useEffect } from "react";
import { render } from "react-dom";
import "./Dots.css";

const CarouselDotClassName = 'carousel-dot';
const CarouselDotActiveClassName = 'carousel-dot-active';
const CarouselDotsClassName = 'carousel-dots';

class Dots extends React.PureComponent {
    constructor(props){
        super(props);
        this.buttonOnClick = this.buttonOnClick.bind(this);
        this.state={
            currentSlide: 0
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.currentSlide!==prevProps.currentSlide)
            this.setState({currentSlide: this.props.currentSlide});
    }
    buttonOnClick(evt){
        let dotNumber = +evt.target.id;

        if (dotNumber === this.state.currentSlide) {
            return;
        }
        const countSwipes = Math.abs(this.state.currentSlide - dotNumber);
        this.setState({currentSlide: dotNumber});
        this.props.clickDots(countSwipes, dotNumber)
    }
    render() {
        return (
            <div className={CarouselDotsClassName} onClick={this.buttonOnClick}>
                {
                    Array.from(Array(this.props.size).keys()).map((key) => (
                        <button key={key} id={key} className={CarouselDotClassName + ' ' + (key === this.state.currentSlide ? CarouselDotActiveClassName : '')}></button>
                    ))
                }
            </div>
        );
    }

}

export default Dots;