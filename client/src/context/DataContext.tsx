import { StudentCoordinate } from 'components/App'
import { createContext, useContext, useEffect, useState } from 'react'
import { Program, Student } from 'types/Types'
import { getAllStudents, getCompositeImage, getUniquePrograms } from 'utils/api'

interface DataType {
  students: Student[]
  composites: {
    src: string
    program: Program
    students: StudentCoordinate[]
  }[]
}
// interface DataType {
//   students: Student[]
//   composites: {
//     src: string
//     program: Program
//   }[]
// }

interface DataContextType {
  data: DataType | null
  loading: boolean
  error: string | null
  fetchData: () => Promise<void> // Function to re-fetch data
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<DataType | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)

      const students: Student[] = await getAllStudents()
      const programs: Program[] = await getUniquePrograms()

      const composites = await Promise.all(
        programs.map(async (program) => {
          return {
            src: await getCompositeImage(program.program, program.year),
            program: program
          }
        })
      )

      // setData({
      //   students: students,
      //   composites: composites
      // })

      // ====

      const tempComposites: {
        src: string
        program: Program
        students: StudentCoordinate[]
      }[] = []

      composites.forEach((composite) => {
        tempComposites.push({
          src: composite.src,
          program: composite.program,
          students: []
        })
      })

      students.forEach((student: Student) => {
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

      // setComposites(tempComposites)

      setData({
        students: students,
        composites: tempComposites
      })
    } catch (err) {
      setError('Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  // Fetch data on mount
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <DataContext.Provider value={{ data, loading, error, fetchData }}>
      {children}
    </DataContext.Provider>
  )
}

// Custom hook for using the DataContext
export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
