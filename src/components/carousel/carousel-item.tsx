interface IProps {
  src: string
  alt: string
  // Первый слайд грузим сразу (это LCP), остальные — по мере появления
  eager?: boolean
}

function CarouselItem(props: IProps) {
  const { src, alt, eager = false } = props

  return (
    <div style={{ marginRight: '20px' }}>
      <img
        src={src}
        alt={alt}
        style={{ height: '300px' }}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  )
}

export default CarouselItem
