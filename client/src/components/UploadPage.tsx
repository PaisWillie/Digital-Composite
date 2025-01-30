import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'
import Dropdown from 'components/Dropdown/Dropdown'
import { v4 as uuidv4 } from 'uuid'

function UploadPage() {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [program, setProgram] = useState('')
  const [year, setYear] = useState('')
  const navigate = useNavigate()

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!uploadFile || !program || !year) {
      alert('Please fill in all fields and select a file.')
      return
    }

    // Redirect to CompositeViewPage with composite data
    navigate('/Admin/CompositeViewPage', {
      state: {
        id: uuidv4(), // Generate a unique ID for the composite
        file: uploadFile,
        program,
        year,
        names: [] // No names yet; this can be updated in CompositeViewPage
      }
    })
  }

  const handleBackToAdmin = () => {
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Upload Composite</h2>

      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Program
          </label>
          <Dropdown
            options={[
              'Select Program',
              'Electrical',
              'Mechanical',
              'Software Engineering'
            ]}
            selectedValue={program}
            onSelect={setProgram}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Year
          </label>
          <Dropdown
            options={['Select Year', '2022', '2023', '2024']}
            selectedValue={year}
            onSelect={setYear}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Composite
          </label>
          <input type="file" onChange={handleFileChange} className="mt-2" />
        </div>

        <div className="mt-6 flex gap-4">
          <TextButton variant="primary" onClick={handleUpload}>
            Upload Composite
          </TextButton>
          <TextButton variant="secondary" onClick={handleBackToAdmin}>
            Back to Admin
          </TextButton>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
