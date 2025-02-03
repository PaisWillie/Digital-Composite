import { TestCompositeData } from 'composite-data'
import CompositeCarousel from './Composite/CompositeCarousel'
import Layout from './Layout/Layout'

const composites = [
  {
    src: '/composites/test.jpg',
    originalImageWidth: 3667,
    originalImageHeight: 2713,
    students: TestCompositeData.students.map((student) => {
      return {
        name: student.name,
        x1: student.top_left[0],
        y1: student.top_left[1],
        x2: student.bottom_right[0],
        y2: student.bottom_right[1]
      }
    })
  }
]

function App() {
  return (
    <Layout>
      <CompositeCarousel composites={composites} />
    </Layout>
  )
}

export default App
