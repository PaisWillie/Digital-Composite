import { Carousel } from 'antd'

const composites = Array(10).fill('/images/composites/MATERIALS 2024 Final.jpg')

function App() {
  return (
    <div className="h-screen overflow-y-hidden overflow-x-scroll">
      <Carousel
        autoplay
        infinite
        autoplaySpeed={10000}
        easing="ease-in"
        speed={1500}
      >
        {composites.map((composite, index) => (
          <img
            key={index}
            src={composite}
            className="size-full object-contain"
          />
        ))}
      </Carousel>
    </div>
  )
}

export default App
