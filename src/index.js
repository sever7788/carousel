import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from "./component/Carousel/Carousel";

import img1 from "./img/1.jpg";
import img2 from "./img/2.jpg";
import img3 from "./img/3.jpg";
import img4 from "./img/4.jpg";
import img5 from "./img/5.jpg";

const content = {
    text1:<h1 >Hello!</h1>,
    img1:<img src={img1} alt="Вечерняя природа" />,
    img2:<img src={img2} alt="Вечерняя природа" />,
    img3:<img src={img3} alt="Вечерняя природа" />,
    img4:<img src={img4} alt="Вечерняя природа" />,
    img5:<img src={img5} alt="Вечерняя природа" />

}
ReactDOM.render(<Carousel options = {{margin: 10 }} content = {content}/>, document.querySelector("#root"));