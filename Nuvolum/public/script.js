const { Component } = React;
const { render } = ReactDOM;

const carouselContainer = document.querySelector(".carousel-container");

// Data for carousel
const carouselSlidesData = [
    {
        "id": 1,
        "image": "images/1.jpg",
        "alt": "Image One"
    },
    {
        "id": 2,
        "image": "images/2.jpg",
        "alt": "Image Two"
    },
    {
        "id": 3,
        "image": "images/3.jpg",
        "alt": "Image Three"
    },
    {
        "id": 4,
        "image": "images/4.jpg",
        "alt": "Image Four"
    },
    {
        "id": 5,
        "image": "images/5.jpg",
        "alt": "Image Five"
    }
];



class CarouselLeftArrow extends Component {
  render() {
    return(
      React.createElement("a", {
        href: "#",
        className: "carousel__arrow carousel__arrow--left",
        onClick: this.props.onClick },

      React.createElement("span", { className: "fa fa-2x fa-angle-left" })));


  }}


class CarouselRightArrow extends Component {
  render() {
    return(
      React.createElement("a", {
        href: "#",
        className: "carousel__arrow carousel__arrow--right",
        onClick: this.props.onClick },

      React.createElement("span", { className: "fa fa-2x fa-angle-right" })));
  }}


class CarouselIndicator extends Component {
  render() {
    return(
      React.createElement("li", null,
      React.createElement("a", {
        className:
        this.props.index == this.props.activeIndex ?
        "carousel__indicator carousel__indicator--active" :
        "carousel__indicator",

        onClick: this.props.onClick })));
  }}


class CarouselSlide extends Component {
  render() {
    return(
      React.createElement("li", {
        className:
        this.props.index == this.props.activeIndex ?
        "carousel__slide carousel__slide--active" :
        "carousel__slide" },


      React.createElement("img", { src: this.props.slide.image, className: "carousel-slide__content", alt: this.props.slide.alt}, )))
}}


// Carousel wrapper component
class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToSlide = this.goToSlide.bind(this);
    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0 };

  }

  goToSlide(index) {
    this.setState({
      activeIndex: index });

  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length;

    if (index < 1) {
      index = slidesLength;
    }

    --index;

    this.setState({
      activeIndex: index });

  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;
    let { slides } = this.props;
    let slidesLength = slides.length - 1;

    if (index === slidesLength) {
      index = -1;
    }

    ++index;

    this.setState({
      activeIndex: index });

  }

  render() {
    return(
      React.createElement("div", { className: "carousel" },
      React.createElement(CarouselLeftArrow, { onClick: e => this.goToPrevSlide(e) }),

      React.createElement("ul", { className: "carousel__slides" },
      this.props.slides.map((slide, index) =>
      React.createElement(CarouselSlide, {
        key: index,
        index: index,
        activeIndex: this.state.activeIndex,
        slide: slide }))),


      React.createElement(CarouselRightArrow, { onClick: e => this.goToNextSlide(e) }),

      React.createElement("ul", { className: "carousel__indicators" },
      this.props.slides.map((slide, index) =>
      React.createElement(CarouselIndicator, {
        key: index,
        index: index,
        activeIndex: this.state.activeIndex,
        isActive: this.state.activeIndex == index,
        onClick: e => this.goToSlide(index) })))));
  }}


// Render Carousel component
render(React.createElement(Carousel, { slides: carouselSlidesData }), carouselContainer);