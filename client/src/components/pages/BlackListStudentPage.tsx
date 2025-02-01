import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'
import Select from 'react-select'
import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function BlackListStudentPage() {
  const [program, setProgram] = useState<{
    label: string
    value: string
  } | null>(null)
  const [year, setYear] = useState<{ label: string; value: string } | null>(
    null
  )
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (!program || !year || !searchTerm) {
      toast.error(
        'Please fill in all fields and enter a search term.',
        toastOptions
      )
      return
    }

    // Implement search logic here
    toast.success('Search executed successfully!', toastOptions)
  }

  const handleBackToAdmin = () => {
    navigate('/admin')
  }

  const programOptions = [
    { label: 'BTech', value: 'BTech' },
    { label: 'Chemical Engineering', value: 'Chemical Engineering' },
    { label: 'Civil Engineering', value: 'Civil Engineering' },
    { label: 'Computer Engineering', value: 'Computer Engineering' },
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Electrical', value: 'Electrical' },
    { label: 'Engineering Class', value: 'Engineering Class' },
    { label: 'Engineering Physics', value: 'Engineering Physics' },
    { label: 'IBEHS', value: 'IBEHS' },
    { label: 'iBioMed', value: 'iBioMed' },
    { label: 'Materials', value: 'Materials' },
    { label: 'Mechanical', value: 'Mechanical' },
    { label: 'Mechatronics', value: 'Mechatronics' },
    { label: 'Software Engineering', value: 'Software Engineering' }
  ]

  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: currentYear - 1920 + 1 }, (_, i) => {
    const year = 1920 + i
    return { label: year.toString(), value: year.toString() }
  })

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

        <div className="mt-6 flex gap-4">
          <TextButton variant="primary" onClick={handleSearch}>
            Search
          </TextButton>
          <TextButton variant="secondary" onClick={handleBackToAdmin}>
            Back to Admin
          </TextButton>
        </div>
      </div>
    </div>
  )
}

export default BlackListStudentPage
