import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.css'

import CarouselItem from './carousel-item'
import img0 from '../../images/0.jpeg'
import img1 from '../../images/1.jpeg'
import img2 from '../../images/2.jpeg'
import img3 from '../../images/3.jpeg'
import img4 from '../../images/4.jpeg'
import img5 from '../../images/5.jpeg'
import img6 from '../../images/6.jpeg'
import img7 from '../../images/7.jpeg'
import { Box } from '@mui/material'

const images = [img0, img1, img2, img3, img4, img5, img6, img7]

function Carousel() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    arrows: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1075,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  }

  return (
    <Box className="slider-container">
      <Slider {...settings}>
        {images.map((el, i) => {
          return <CarouselItem src={el} key={i} alt="#" />
        })}
      </Slider>
    </Box>
  )
}

export default Carousel
