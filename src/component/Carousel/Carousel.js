import React, { Component, useEffect } from "react";
import "./Carousel.css"
import Slide from "../Slide/Slide";
import Dots from "../Dots/Dots";
import Nav from "../Nav/Nav";

const CarouselClassName = 'carousel';
const CarouselDraggableClassName = 'carousel-draggable';
const CarouselLineClassName = 'carousel-line';
const CarouselLineContainerClassName = 'carousel-line-container';


export class Carousel extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0
        }
        this.content = Object.values(this.props.content);
        console.log(this.content);
        this.setParameters = this.setParameters.bind(this);
        this.setEvents = this.setEvents.bind(this);
        this.resizeCarousel = this.resizeCarousel.bind(this);
        this.startDrag = this.startDrag.bind(this);
        this.stopDrag = this.stopDrag.bind(this);
        this.dragging = this.dragging.bind(this);
        this.setStylePosition = this.setStylePosition.bind(this);
        this.clickDots = this.clickDots.bind(this);
        this.moveToLeft = this.moveToLeft.bind(this);
        this.moveToRight = this.moveToRight.bind(this);
        

        this.element = React.createRef();
        this.carouselLine = React.createRef();
        this.lineContainerNode = React.createRef();
    }

    componentWillUnmount() {
        this.destroyEvents();
    }

    componentDidMount() {
        this.containerNode = this.element.current;
        this.size = this.carouselLine.current.childElementCount;
        this.isDragging = false;
        this.currentSlideWasChanged = false;
        this.settings = {
            margin: this.props.options.margin || 0
        }

        
        this.setParameters();
        this.setEvents();
    }
    componentDidUpdate() {
        if(!this.isDragging)
        this.changeCurrentSlide();
    }

    render() {


        return <div className="container" >
            <div id="carousel" className={CarouselClassName} ref={this.element}>
                <div className={CarouselLineContainerClassName} ref={this.lineContainerNode}>
                    <div className={CarouselLineClassName} ref={this.carouselLine}>
                        {
                            Array.from(this.content).map(u =>
                                <div className="carousel-slide">
                                    <Slide u = {u}/>
                                </div>
                            )
                        }

                    </div>
                </div>
                <Nav moveToLeft={this.moveToLeft} moveToRight={this.moveToRight} />
                <Dots clickDots={this.clickDots} size={this.content.length} currentSlide={this.state.currentSlide} />
            </div>
        </div>;
    }

    setParameters() {
        this.slideNodes = Array.from(this.carouselLine.current.children);
        const coordsLineContainer = this.lineContainerNode.current.getBoundingClientRect();
        this.width = coordsLineContainer.width;
        this.maximumX = -(this.size - 1) * (this.width + this.settings.margin);
        this.x = -this.state.currentSlide * (this.width + this.settings.margin);

        this.resetStyleTransition();
        this.carouselLine.current.style.width = `${this.size * (this.width + this.settings.margin)}px`;
        this.setStylePosition();
        Array.from(this.slideNodes).forEach((slideNodes) => {
            slideNodes.style.width = `${this.width}px`;
            slideNodes.style.marginRight = `${this.settings.margin}px`;
        });
    }


    setEvents() {
        this.debouncedResizeCarousel = debounce(this.resizeCarousel);
        window.addEventListener('resize', this.debouncedResizeCarousel); //
        this.carouselLine.current.addEventListener('pointerdown', this.startDrag);
        window.addEventListener('pointerup', this.stopDrag);
        window.addEventListener('pointercancel', this.stopDrag);
    }

    destroyEvents() {
        window.removeEventListener('resize', debouncedResizeCarousel);
        this.carouselLine.current.removeEventListener('pointerdown', this.startDrag);
        window.removeEventListener('pointerup', this.stopDrag);
        window.removeEventListener('pointercancel', this.stopDrag);
    }

    resizeCarousel() {

        this.setParameters();
    }

    startDrag(evt) {
        this.isDragging = true;
        this.currentSlideWasChanged = false;
        this.clickX = evt.pageX;
        this.startX = this.x;
        this.resetStyleTransition();

        this.containerNode.classList.add(CarouselDraggableClassName);
        window.addEventListener('pointermove', this.dragging);

    }

    stopDrag() {
        window.removeEventListener('pointermove', this.dragging);

        this.containerNode.classList.remove(CarouselDraggableClassName);

        this.changeCurrentSlide();
        this.isDragging = false;
    }

    dragging(evt) {
        this.dragX = evt.pageX;
        const dragShift = this.dragX - this.clickX;
        const easing = dragShift / 5;
        this.x = Math.max(Math.min(this.startX + dragShift, easing), this.maximumX + easing);

        this.setStylePosition();
        //change active slide
        if (
            dragShift > 20 &&
            dragShift > 0 &&
            !this.currentSlideWasChanged &&
            this.state.currentSlide > 0
        ) {
            this.currentSlideWasChanged = true;
            this.setState({ currentSlide: this.state.currentSlide - 1 });
        }
        if (
            dragShift < -20 &&
            dragShift < 0 &&
            !this.currentSlideWasChanged &&
            this.state.currentSlide < this.size - 1
        ) {
            this.currentSlideWasChanged = true;
            this.setState({ currentSlide: this.state.currentSlide + 1 });
        }

    }

    clickDots(countSwipes, dotNumber) {

        this.state.currentSlide = dotNumber;
        this.changeCurrentSlide(countSwipes);

    }

    moveToLeft() {
        if (this.state.currentSlide <= 0) {
            return;
        }
        this.setState({ currentSlide: this.state.currentSlide - 1 });
        this.changeCurrentSlide();
    }

    moveToRight() {
        if (this.state.currentSlide >= this.size - 1) {
            return;
        }

        this.setState({ currentSlide: this.state.currentSlide + 1 });
        this.changeCurrentSlide();
    }

    changeCurrentSlide(countSwipes) {
        this.x = -this.state.currentSlide * (this.width + this.settings.margin);
        this.setStylePosition();
        this.setStyleTransition(countSwipes);
    }

    setStylePosition() {
        this.carouselLine.current.style.transform = `translate3d(${this.x}px, 0, 0)`;
    }

    setStyleTransition(countSwipes = 1) {
        this.carouselLine.current.style.transition = `all ${0.25 * countSwipes}s ease 0s`;
    }

    resetStyleTransition() {
        this.carouselLine.current.style.transition = `all 0s ease 0s`;
    }
}


function debounce(func, time = 100) {
    let timer;
    return function (event) {
        clearTimeout(timer);
        timer = setTimeout(func, time, event);
    }
}

export default Carousel;