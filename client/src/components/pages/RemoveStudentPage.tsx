import TextButton from 'components/Button/TextButton'
import AdminLayout from 'components/Layout/AdminLayout'
import { showErrorToast, showSuccessToast } from 'components/Toasts/Toasts'
import { useEffect, useRef, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { programOptions, yearOptions } from 'utils/constants'

type Student = {
  name: string
  image_id: string
  top_left: [number, number]
  top_right: [number, number]
  bottom_left: [number, number]
  bottom_right: [number, number]
  student_region: [number, number][]
}

function RemoveStudentPage() {
  const [program, setProgram] = useState<{
    label: string
    value: string
  } | null>(null)
  const [year, setYear] = useState<{ label: string; value: string } | null>(
    null
  )
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [students, setStudents] = useState<{ label: string; value: Student }[]>(
    []
  )
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // For tracking natural (original) image size
  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 })

  // For tracking how far the image is offset within the container
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (program && year) {
      const fetchCompositeData = async () => {
        try {
          const response = await fetch(
            `https://${
              import.meta.env.VITE_HOST
            }/composite/getComposite?program=${program.value}&year=${
              year.value
            }`,
            { method: 'GET' }
          )
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
          }

          const buffer = await response.arrayBuffer()
          const base64Flag = 'data:image/jpeg;base64,'
          const imageStr = arrayBufferToBase64(buffer)
          setImageSrc(base64Flag + imageStr)

          const studentsResponse = await fetch(
            `https://${
              import.meta.env.VITE_HOST
            }/students/getStudentByYearProgram?program=${program.value}&year=${
              year.value
            }`,
            { method: 'GET' }
          )
          if (!studentsResponse.ok) {
            throw new Error(`HTTP error! status: ${studentsResponse.status}`)
          }
          const studentsData: Student[] = await studentsResponse.json()
          setStudents(
            studentsData.map((s) => ({
              label: s.name,
              value: s
            }))
          )
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: unknown) {
          if (error instanceof Error) {
            showErrorToast(`Error fetching composite data: ${error.message}`)
          } else {
            showErrorToast('An unknown error occurred.')
          }
        }
      }

      fetchCompositeData()
    }
  }, [program, year])

  function arrayBufferToBase64(buffer: ArrayBuffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  // When image finishes loading, record natural size & offset
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setNaturalSize({
      width: e.currentTarget.naturalWidth,
      height: e.currentTarget.naturalHeight
    })
    if (containerRef.current && imageRef.current) {
      const containerBox = containerRef.current.getBoundingClientRect()
      const imageBox = imageRef.current.getBoundingClientRect()
      setImageOffset({
        x: imageBox.left - containerBox.left,
        y: imageBox.top - containerBox.top
      })
    }
  }

  const handleSelectStudent = (
    selectedOption: SingleValue<{ label: string; value: Student }>
  ) => {
    if (selectedOption) {
      setSelectedStudent(selectedOption.value)
      showSuccessToast('Student selected!')
    } else {
      setSelectedStudent(null)
    }
  }

  const handleRemove = async () => {
    if (!program || !year || !selectedStudent) {
      showErrorToast('Please select a program, year, and student.')
      return
    }

    const payload = {
      program: program.value,
      year: year.value,
      student: selectedStudent.student_region
    }

    console.log('Removing student:', JSON.stringify(payload))

    try {
      const response = await fetch(
        `https://${import.meta.env.VITE_HOST}/composite/blacklistStudent`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      showSuccessToast(result.message || 'Student removed successfully!')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: unknown) {
      if (error instanceof Error) {
        showErrorToast(`Error removing student: ${error.message}`)
      } else {
        showErrorToast('An unknown error occurred.')
      }
    }
  }

  // Scale factor from natural to displayed size
  let scaleX = 1
  let scaleY = 1
  if (imageRef.current && naturalSize.width > 0 && naturalSize.height > 0) {
    const displayedWidth = imageRef.current.clientWidth
    const displayedHeight = imageRef.current.clientHeight
    scaleX = displayedWidth / naturalSize.width
    scaleY = displayedHeight / naturalSize.height
  }

  return (
    <AdminLayout currPageHref="/admin/removeStudentPage">
      {/* Composite Image Container */}
      <div
        ref={containerRef}
        className="relative mb-6 flex h-96 w-full max-w-4xl items-center justify-center rounded-lg bg-gray-300"
      >
        {imageSrc ? (
          <>
            <img
              ref={imageRef}
              onLoad={handleImageLoad}
              src={imageSrc}
              alt="Composite"
              className="max-h-full max-w-full rounded-lg"
            />

            {selectedStudent && (
              <svg className="pointer-events-none absolute left-0 top-0 size-full">
                {(() => {
                  const { top_left, top_right, bottom_left, bottom_right } =
                    selectedStudent
                  const corners = [
                    top_left,
                    top_right,
                    bottom_left,
                    bottom_right
                  ]

                  const xs = corners.map((c) => c[0])
                  const ys = corners.map((c) => c[1])

                  const xMin = Math.min(...xs)
                  const xMax = Math.max(...xs)
                  const yMin = Math.min(...ys)
                  const yMax = Math.max(...ys)

                  // 4) Apply your existing scale and offset
                  const x = xMin * scaleX + imageOffset.x
                  const y = yMin * scaleY + imageOffset.y
                  const w = (xMax - xMin) * scaleX
                  const h = (yMax - yMin) * scaleY

                  return (
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                    />
                  )
                })()}
              </svg>
            )}
          </>
        ) : (
          <span className="text-gray-700">
            Select program and year to load image...
          </span>
        )}
      </div>

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
          <div className="mb-4">
            <label className="block pb-1 text-sm font-medium text-gray-700">
              Search / Select Student
            </label>
            <Select
              options={students}
              value={
                students.find((opt) => opt.value === selectedStudent) || null
              }
              onChange={handleSelectStudent}
              isClearable
              placeholder="Enter or select student name"
            />
          </div>
        )}

        <div className="mt-6 flex gap-4 flex-row items-center">
          {selectedStudent && (
            <TextButton variant="primary" onClick={handleRemove}>
              Remove
            </TextButton>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}

export default RemoveStudentPage
