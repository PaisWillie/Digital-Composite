import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import { Accept, useDropzone } from 'react-dropzone'

function UploadPage() {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [program, setProgram] = useState<{
    label: string
    value: string
  } | null>(null)
  const [year, setYear] = useState<{ label: string; value: string } | null>(
    null
  )
  const navigate = useNavigate()

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles[0])
    }
  }

  const handleUpload = () => {
    if (!uploadFile || !program || !year) {
      alert('Please fill in all fields and select a file.')
      return
    }

    const renamedFile = new File(
      [uploadFile],
      `${year.value}-${program.value}${uploadFile.name.substring(
        uploadFile.name.lastIndexOf('.')
      )}`,
      {
        type: uploadFile.type
      }
    )

    // Redirect to CompositeViewPage with composite data
    navigate('/Admin/CompositeViewPage', {
      state: {
        id: uuidv4(), // Generate a unique ID for the composite
        file: renamedFile,
        program: program.value,
        year: year.value,
        names: [] // No names yet; this can be updated in CompositeViewPage
      }
    })
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
  const yearOptions = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => {
    const year = 1900 + i
    return { label: year.toString(), value: year.toString() }
  })

  const accept: Accept = {
    'image/*': []
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    multiple: false
  })

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Upload Composite</h2>

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
          <label className="block text-sm font-medium text-gray-700">
            Upload Composite
          </label>
          <div
            {...getRootProps()}
            className={`mt-2 flex items-center justify-center rounded-lg border-2 border-dashed p-6 ${
              isDragActive ? 'border-blue-500' : 'border-gray-300'
            }`}
          >
            <input {...getInputProps()} />
            {uploadFile ? (
              <p>{uploadFile.name}</p>
            ) : (
              <p>Drag & drop a file here, or click to select a file</p>
            )}
          </div>
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
