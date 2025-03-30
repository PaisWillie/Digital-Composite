import { StudentCoordinate } from 'components/App'
import { createContext, useContext, useEffect, useState } from 'react'
import { Program, Student } from 'types/Types'
import {
  getAllStudents,
  getCompositeImage,
  getPreviewCompositeImage,
  getUniquePrograms
} from 'utils/api'

function splitCamelCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2') // space between lower and upper
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // space between multiple uppers and next lower
    .trim()
}

export type SearchOption = {
  type: 'student' | 'program'
  program: Program
  value: string
}

interface DataType {
  students: Student[]
  composites: {
    src: string
    previewSrc: string
    program: Program
    students: StudentCoordinate[]
  }[]
  searchOptions: SearchOption[]
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

      // Fetch data

      const students: Student[] = await getAllStudents()
      const programs: Program[] = await getUniquePrograms()

      // Fetch composite images
      const composites = await Promise.all(
        programs.map(async (program) => {
          return {
            src: await getCompositeImage(program.program, program.year),
            program: program
          }
        })
      )

      const previewComposites = await Promise.all(
        programs.map(async (program) => {
          return {
            src: await getPreviewCompositeImage(program.program, program.year),
            program: program
          }
        })
      )

      // Map students to composites
      const tempComposites: {
        src: string
        previewSrc: string
        program: Program
        students: StudentCoordinate[]
      }[] = []

      composites.forEach((composite, index) => {
        tempComposites.push({
          src: composite.src,
          previewSrc: previewComposites[index].src,
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
            program: splitCamelCase(student.image_id.split('#')[1]),
            year: parseInt(student.image_id.split('#')[0], 10),
            x1: student.top_left[0],
            y1: student.top_left[1],
            x2: student.bottom_right[0],
            y2: student.bottom_right[1]
          })
        }
      })

      // Map data to search options
      const studentSearchOptions: {
        type: 'student'
        program: Program
        value: string
      }[] = students.map((student) => ({
        type: 'student',

        program: composites.find(
          (composite) =>
            composite.program.program === student.image_id.split('#')[1] &&
            composite.program.year === student.image_id.split('#')[0]
        )?.program ?? {
          program: '',
          year: ''
        },

        value: student.name
      }))

      const programSearchOptions: {
        type: 'program'
        program: Program
        value: string
      }[] = composites.map((composite) => ({
        type: 'program',
        program: composite.program,
        value: composite.program.program + ', ' + composite.program.year
      }))

      // Set data
      setData({
        students: students,
        composites: tempComposites,
        searchOptions: [...studentSearchOptions, ...programSearchOptions]
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
