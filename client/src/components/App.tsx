import { Carousel } from 'antd'
import Layout from './Layout/Layout'

function App() {
  return (
    <Layout>
      <div className="flex h-full flex-col justify-center">
        <Carousel
          autoplay
          infinite
          autoplaySpeed={10000}
          easing="ease-in"
          speed={1500}
        >
          <img
            src="/composites/test.jpg"
            useMap="#workmap"
            className="max-h-[95vh] object-contain"
          />
          <img
            src="/composites/test.jpg"
            useMap="#workmap"
            className="max-h-[95vh] object-contain"
          />
        </Carousel>
      </div>
    </Layout>
  )
}

export default App
