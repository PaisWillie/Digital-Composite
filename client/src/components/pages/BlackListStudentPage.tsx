import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'
import Select from 'react-select'
import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { programOptions, yearOptions } from 'utils/constants'

function BlackListStudentPage() {
  const [program, setProgram] = useState<{
    label: string
    value: string
  } | null>(null)
  const [year, setYear] = useState<{ label: string; value: string } | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [students, setStudents] = useState<
    { name: string; coordinates: number[][] }[]
  >([])
  const [selectedStudent, setSelectedStudent] = useState<{
    name: string
    coordinates: number[][]
  } | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (program && year) {
      const fetchCompositeData = async () => {
        try {
          const response = await fetch(
            `/api/composite?program=${program.value}&year=${year.value}`
          )
          const data = await response.json()
          setImageSrc(data.image)
          setStudents(data.students)
        } catch (error) {
          console.error('Error fetching composite data:', error)
        }
      }

      fetchCompositeData()
    }
  }, [program, year])

  const handleSearch = () => {
    if (!program || !year || !searchTerm) {
      toast.error(
        'Please fill in all fields and enter a search term.',
        toastOptions
      )
      return
    }

    const student = students.find((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    if (student) {
      setSelectedStudent(student)
      toast.success('Student found!', toastOptions)
    } else {
      toast.error('Student not found.', toastOptions)
    }
  }

  const handleBackToAdmin = () => {
    navigate('/admin')
  }

  const toastOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    style: {
      backgroundColor: '#7A003C',
      color: '#FFFFFF'
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Black List Student</h2>

      {/* Composite Image Display */}
      <div className="mb-6 flex h-96 w-full max-w-4xl items-center justify-center rounded-lg bg-gray-300">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Composite"
            className="max-h-full max-w-full rounded-lg"
          />
        ) : (
          <span className="text-gray-700">
            Select program and year to load image...
          </span>
        )}
      </div>

      {/* Program and Year Selection */}
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <label className="block pb-1 text-sm font-medium text-gray-700">
            Select Program
          </label>
          <Select
            options={programOptions}
            value={program}
            onChange={setProgram}
            isClearable
            placeholder="Select Program"
          />
        </div>

        <div className="mb-4">
          <label className="block pb-1 text-sm font-medium text-gray-700">
            Select Year
          </label>
          <Select
            options={yearOptions}
            value={year}
            onChange={setYear}
            isClearable
            placeholder="Select Year"
          />
        </div>

        {imageSrc && students.length > 0 && (
          <>
            <div className="mb-4">
              <label className="block pb-1 text-sm font-medium text-gray-700">
                Search Student
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter student name"
                className="w-full rounded-lg border border-gray-300 p-2"
              />
            </div>
          </>
        )}
        <div className="mt-6 flex gap-4">
          <TextButton variant="primary" onClick={handleSearch}>
            Search
          </TextButton>
          <TextButton variant="secondary" onClick={handleBackToAdmin}>
            Back to Admin
          </TextButton>
        </div>
      </div>

      {/* Draw Circle on Selected Student */}
      {selectedStudent && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">
            Selected Student: {selectedStudent.name}
          </h3>
          <svg className="mt-4" width="500" height="500">
            <image href={imageSrc || undefined} width="500" height="500" />
            {selectedStudent.coordinates.map((coord, index) => (
              <circle
                key={index}
                cx={coord[0]}
                cy={coord[1]}
                r="10"
                fill="red"
              />
            ))}
          </svg>
        </div>
      )}
    </div>
  )
}

export default BlackListStudentPage
