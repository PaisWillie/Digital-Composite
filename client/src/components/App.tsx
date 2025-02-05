import { useData } from 'context/DataContext'
import { useEffect, useState } from 'react'
import { Program, Student } from 'types/Types'
import CompositeCarousel from './Composite/CompositeCarousel'
import Layout from './Layout/Layout'

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

export type StudentCoordinate = {
  name: string
  x1: number
  y1: number
  x2: number
  y2: number
}

function App() {
  const [composites, setComposites] = useState<
    { src: string; program: Program; students: StudentCoordinate[] }[]
  >([])

  const { data, loading, error } = useData()

  // TODO: move this to context so that it is only fetched once
  useEffect(() => {
    const tempComposites: {
      src: string
      program: Program
      students: StudentCoordinate[]
    }[] = []

    data?.composites.forEach((composite) => {
      tempComposites.push({
        src: composite.src,
        program: composite.program,
        students: []
      })
    })

    data?.students.forEach((student: Student) => {
      // student.image_id is in the format of 'year#program'
      // match the student's program with the composite's program
      const studentProgram = student.image_id.split('#')

      const composite = tempComposites.find(
        (composite) =>
          composite.program.program === studentProgram[1] &&
          composite.program.year === studentProgram[0]
      )

      if (composite) {
        composite.students.push({
          name: student.name,
          x1: student.top_left[0],
          y1: student.top_left[1],
          x2: student.bottom_right[0],
          y2: student.bottom_right[1]
        })
      }
    })

    setComposites(tempComposites)
  }, [data])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <Layout>
      <CompositeCarousel composites={composites} />
    </Layout>
  )
}

export default App
