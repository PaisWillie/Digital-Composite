/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'
import Select from 'react-select'
import { v4 as uuidv4 } from 'uuid'
import { Accept, useDropzone } from 'react-dropzone'
import {
  showErrorToast,
  showInfoToast,
  showLoadingToast,
  updateToast
} from 'components/Toasts/Toasts'
import { programOptions, yearOptions } from 'utils/constants'
import AdminLayout from 'components/Layout/AdminLayout'

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

  useEffect(() => {
    const fetchComposites = async () => {
      try {
        const response = await fetch(
          `https://${import.meta.env.VITE_HOST}/students/getUniquePrograms`,
          {
            method: 'GET'
          }
        )

        if (!response.ok) {
          showErrorToast(`HTTP error! status: ${response.status}`)
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
        showErrorToast(
          `Error fetching composites: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        )
      }
    }

    fetchComposites()
  }, [])

  useEffect(() => {
    if (program && year && existingComposites.length > 0) {
      const exists = existingComposites.some(
        (composite) =>
          composite.program === program.value && composite.year === year.value
      )
      if (exists) {
        showInfoToast(
          'This program and year combination already has a composite.'
        )
      }
    }
  }, [program, year, existingComposites])

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadFile(acceptedFiles[0])
    }
  }

  const handleUpload = async () => {
    if (!uploadFile || !program || !year) {
      showErrorToast('Please fill in all fields and select a file.')
      return
    }

    const formData = new FormData()
    formData.append('file', uploadFile)
    formData.append('program', program.value)
    formData.append('year', year.value)

    const toastId = showLoadingToast('Processing file...')

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_HOST}/composite/uploadComposite`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) {
        throw new Error('Error uploading file')
      }

      const result = await response.json()

      // Dismiss the loading toast and navigate to the composite view page
      updateToast(toastId, 'File uploaded successfully!', 'success')
      navigate('/admin/compositeViewPage', {
        state: {
          id: uuidv4(),
          file: uploadFile,
          program: program.value,
          year: year.value,
          names: result.data[0].students
        }
      })
    } catch (error) {
      updateToast(
        toastId,
        `Error uploading file: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`,
        'error'
      )
    }
  }

  const accept: Accept = {
    'image/*': []
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept,
    multiple: false
  })

  return (
    <AdminLayout currPageHref="/admin/uploadPage">
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
        </div>
      </div>
    </AdminLayout>
  )
}

export default UploadPage
