interface IProps {
    src: string
    alt: string
}

function CarouselItem(props: IProps) {

  const { src, alt } = props

  return (
    <div style={{marginRight: "20px"}}>
      <img src={src} alt={alt} style={{height: "300px"}} />
    </div>
  )
}

export default CarouselItem
