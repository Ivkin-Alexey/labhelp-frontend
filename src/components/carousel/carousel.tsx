import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.css'
import CarouselItem from './carousel-item'
import img1 from '../../static/img/1.jpeg'
import img2 from '../../static/img/2.jpeg'
import img3 from '../../static/img/3.jpeg'
import img4 from '../../static/img/4.jpeg'
import img5 from '../../static/img/5.jpeg'
import img6 from '../../static/img/6.jpeg'
import img7 from '../../static/img/7.jpeg'
import img8 from '../../static/img/8.jpeg'

export default function Carousel() {

  const settings = {
    dots: true,
    infinite: true,
    centerMode: true,
    slidesToShow: 3,
    variableWidth: true,
    swipeToSlide: true,
    arrows: true,
    initialSlide: 3,
    // autoplay: true,
    // autoplaySpeed: 1000,
    // speed: 3000,
    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  }

  const list = [img1, img2, img3, img4, img5, img6, img7, img8]

  return (
    <div className="slider-container" style={{marginBottom: "30px"}}>
      <Slider {...settings}>
        {list.map((el, i) => {
          return <CarouselItem alt="#" src={el} key={i} />
        })}
      </Slider>
    </div>
  )
}
