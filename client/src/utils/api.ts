import { Program, Student } from 'types/Types'

function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = ''
  const bytes = new Uint8Array(buffer)
  const len = bytes.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

export const getStudents = async (
  program: string,
  year: string | number
): Promise<Student[]> => {
  try {
    const studentsResponse = await fetch(
      `http://localhost:3000/students/getStudentByYearProgram?program=${program}&year=${year}`,
      { method: 'GET' }
    )

    if (!studentsResponse.ok) {
      throw new Error(`HTTP error! status: ${studentsResponse.status}`)
    }

    return await studentsResponse.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error fetching students: ${error.message}`)
  }

  return []
}

export const getCompositeImage = async (
  program: string,
  year: string | number
): Promise<string> => {
  try {
    const response = await fetch(
      `http://localhost:3000/composite/getComposite?program=${program}&year=${year}`,
      { method: 'GET' }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    const base64Flag = 'data:image/jpeg;base64,'
    const imageStr = arrayBufferToBase64(buffer)
    return base64Flag + imageStr
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error fetching composite image: ${error.message}`)
    return ''
  }
}

export const getUniquePrograms = async (): Promise<Program[]> => {
  try {
    const response = await fetch(
      'http://localhost:3000/students/getUniquePrograms',
      {
        method: 'GET'
      }
    )
    const responseJson = await response.json()

    if (!responseJson || !Array.isArray(responseJson)) {
      throw new Error('Invalid data format')
    }

    return responseJson.map((data: string) => {
      const array = data.split('#'),
        year = array[0],
        program = array[1]
      return { year: year, program: program }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error fetching unique programs: ${error.message}`)
    return []
  }
}

export const getAllStudents = async (): Promise<Student[]> => {
  try {
    const response = await fetch('http://localhost:3000/students/getAll', {
      method: 'GET'
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const responseJson = await response.json()

    if (!responseJson || !Array.isArray(responseJson)) {
      throw new Error('Invalid data format')
    }

    return responseJson.map((data: Student) => {
      let topLeft = data.top_left
      let bottomRight = data.bottom_right
      let topRight = data.top_right
      let bottomLeft = data.bottom_left

      if (bottomRight[1] < topLeft[1]) {
        const temp = topLeft
        topLeft = bottomRight
        bottomRight = temp
      }

      if (bottomLeft[1] < topRight[1]) {
        const temp = topRight
        topRight = bottomLeft
        bottomLeft = temp
      }

      return {
        name: data.name,
        image_id: data.image_id,
        top_left: topLeft,
        top_right: topRight,
        bottom_left: bottomLeft,
        bottom_right: bottomRight,
        student_region: data.student_region
      }
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(`Error fetching students: ${error.message}`)
  }

  return []
}
