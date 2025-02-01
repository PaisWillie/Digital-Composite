import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import { Accept, useDropzone } from 'react-dropzone'
import { toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { programOptions, yearOptions } from 'utils/constants'

function UploadPage() {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [program, setProgram] = useState<{
    label: string
    value: string
  } | null>(null)
  const [year, setYear] = useState<{ label: string; value: string } | null>(
    null
  )
  const [existingComposites, setExistingComposites] = useState<
    { program: string; year: string }[]
  >([])
  const navigate = useNavigate()

  console.log(existingComposites)
  useEffect(() => {
    // Fetch existing program/year combinations from the backend
    const fetchComposites = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/students/getUniquePrograms',
          {
            method: 'GET'
          }
        )

        if (!response.ok) {
          toast.error(`HTTP error! status: ${response.status}`, toastOptions)
          return
        }

        const data = await response.json()

        if (!data || !Array.isArray(data)) {
          throw new Error('Invalid data format')
        }

        const newData = data.map((data: string) => {
          const array = data.split('#'),
            year = array[0],
            program = array[1]
          return { year: year, program: program }
        })
        setExistingComposites(newData)
      } catch (error) {
        console.error('Error fetching composites:', error)
      }
    }

    fetchComposites()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (program && year && existingComposites.length > 0) {
      const exists = existingComposites.some(
        (composite) =>
          composite.program === program.value && composite.year === year.value
      )
      if (exists) {
        toast.info(
          'This program and year combination already has a composite.',
          toastOptions
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [program, year])

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles[0])
    }
  }

  const handleUpload = async () => {
    if (!uploadFile || !program || !year) {
      toast.error('Please fill in all fields and select a file.', toastOptions)
      return
    }

    // Check if the program and year combination already exists
    const exists = existingComposites.some(
      (composite) =>
        composite.program === program.value && composite.year === year.value
    )
    if (exists) {
      toast.error(
        'This program and year combination already has a composite.',
        toastOptions
      )
      return
    }

    // Prepare form data for the POST request
    const formData = new FormData()
    formData.append('picture', uploadFile)
    formData.append('program', program.value)
    formData.append('year', year.value)

    try {
      const response = await fetch('/api/uploadComposite', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Error uploading file')
      }

      toast.success('File uploaded successfully!', toastOptions)
      // Redirect to CompositeViewPage with composite data
      navigate('/admin/compositeViewPage', {
        state: {
          id: uuidv4(), // Generate a unique ID for the composite
          file: uploadFile,
          program: program.value,
          year: year.value,
          names: [] // No names yet; this can be updated in CompositeViewPage
        }
      })
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Error uploading file.', toastOptions)
    }
  }

  const handleBackToAdmin = () => {
    navigate('/admin')
  }

  const accept: Accept = {
    'image/*': []
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    multiple: false
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
