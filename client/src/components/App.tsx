import { useData } from 'context/DataContext'
import CompositeCarousel from './Composite/CompositeCarousel'
import Layout from './Layout/Layout'
import { Progress, ProgressProps } from 'antd'
import { useEffect, useState } from 'react'

// const composites = [
//   {
//     src: '/composites/test.jpg',
//     originalImageWidth: 3667,
//     originalImageHeight: 2713,
//     students: TestCompositeData.students.map((student) => {
//       return {
//         name: student.name,
//         x1: student.top_left[0],
//         y1: student.top_left[1],
//         x2: student.bottom_right[0],
//         y2: student.bottom_right[1]
//       }
//     })
//   }
// ]

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#800000', // Maroon
  '100%': '#b22222' // Firebrick
}

export type StudentCoordinate = {
  name: string
  x1: number
  y1: number
  x2: number
  y2: number
}

function App() {
  // const [composites, setComposites] = useState<
  //   { src: string; program: Program; students: StudentCoordinate[] }[]
  // >([])

  const { data, loading, error } = useData()
  const [progress, setProgress] = useState(0) // Add state for progress

  // useEffect(() => {
  //   if (data) {
  //     setComposites(data.composites)
  //   }
  // }, [data])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval!)
            return 99
          }
          return prev + 5
        })
      }, 1) // Adjust the interval duration as needed
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading]) // Run effect when loading changes

  if (loading) {
    return (
      <Layout>
        <Progress
          strokeColor={twoColors}
          percent={progress}
          showInfo={false}
          className="opacity-25"
        />
      </Layout>
    )
  }

  if (error) {
    return <Layout>Error: {error}</Layout>
  }

  return (
    <Layout>
      <CompositeCarousel composites={data?.composites || []} />
      <p className="flex w-full flex-row justify-center italic text-gray-500 font-poppins mb-4">
        Need your photo removed? Contact
        <span className="ml-1 underline">engalum@mcmaster.ca</span>
      </p>
    </Layout>
  )
}

export default App
