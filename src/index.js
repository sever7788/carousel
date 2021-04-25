import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from "./component/Carousel/Carousel";

import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";

const images = [img1, img2, img3, img4, img5];
ReactDOM.render(<Carousel options = {{margin: 10, images: images}} />, document.querySelector("#root"));