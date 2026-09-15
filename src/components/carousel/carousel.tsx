import { Box } from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import CarouselItem from './carousel-item'
import img0 from '../../images/0.webp'
import img1 from '../../images/1.webp'
import img2 from '../../images/2.webp'
import img3 from '../../images/3.webp'
import img4 from '../../images/4.webp'
import img5 from '../../images/5.webp'
import img6 from '../../images/6.webp'
import img7 from '../../images/7.webp'
import './style.css'

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
          return <CarouselItem src={el} key={i} alt="#" eager={i === 0} />
        })}
      </Slider>
    </Box>
  )
}

export default Carousel
