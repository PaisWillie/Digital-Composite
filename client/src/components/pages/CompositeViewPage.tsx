import { useState, useEffect, ChangeEvent, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'
import TextField from 'components/TextField/TextField'
import { FaTrash } from 'react-icons/fa'
import AdminLayout from 'components/Layout/AdminLayout'

type Student = {
  name: string
  image_id: string
  top_left: [number, number]
  top_right: [number, number]
  bottom_left: [number, number]
  bottom_right: [number, number]
  student_region: [number, number][]
}

function CompositeViewPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const compositeData = location.state || {}
  const [names, setNames] = useState<Student[]>(compositeData.names || [])
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const [naturalSize, setNaturalSize] = useState({ width: 0, height: 0 })
  const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 })

  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (compositeData.file) {
      const reader = new FileReader()
      reader.onload = (e) => setImageSrc(e.target?.result as string)
      reader.readAsDataURL(compositeData.file)
    }
  }, [compositeData.file])

  const handleImageLoad = () => {
    if (imageRef.current && containerRef.current) {
      setNaturalSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      })
      const containerBox = containerRef.current.getBoundingClientRect()
      const imageBox = imageRef.current.getBoundingClientRect()
      setImageOffset({
        x: imageBox.left - containerBox.left,
        y: imageBox.top - containerBox.top
      })
    }
  }

  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...names]
    updatedNames[index].name = newName
    setNames(updatedNames)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleAddName = () => {
    setNames([
      ...names,
      {
        name: '',
        image_id: '',
        top_left: [0, 0],
        top_right: [0, 0],
        bottom_left: [0, 0],
        bottom_right: [0, 0],
        student_region: []
      }
    ])
  }

  const handleSave = async () => {
    const updatedComposite = {
      Program: compositeData.program,
      Year: compositeData.year,
      Batch: { students: names }
    }

    try {
      console.log(import.meta.env.VITE_HOST)
      const response = await fetch(
        `https://${import.meta.env.VITE_HOST}/students/addStudent`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedComposite)
        }
      )

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      console.log('Success:', result)

      navigate('/Admin/ManageCompositesPage', {
        state: [updatedComposite]
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  let scaleX = 1
  let scaleY = 1
  if (imageRef.current && naturalSize.width > 0 && naturalSize.height > 0) {
    const displayedWidth = imageRef.current.clientWidth
    const displayedHeight = imageRef.current.clientHeight
    scaleX = displayedWidth / naturalSize.width
    scaleY = displayedHeight / naturalSize.height
  }

  return (
    <AdminLayout currPageHref="/admin/manageCompositesPage">
      <h2 className="mb-6 text-2xl font-semibold">Edit Composite</h2>
      <div
        ref={containerRef}
        className="relative mb-6 flex h-96 w-full max-w-4xl items-center justify-center rounded-lg bg-gray-300"
      >
        {imageSrc ? (
          <>
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Composite"
              className="max-h-full max-w-full rounded-lg"
              onLoad={handleImageLoad}
            />
            <svg className="pointer-events-none absolute left-0 top-0 size-full">
              {names.map((student, index) => {
                const { top_left, top_right, bottom_left, bottom_right } =
                  student
                const corners = [top_left, top_right, bottom_left, bottom_right]

                const xs = corners.map((c) => c[0])
                const ys = corners.map((c) => c[1])

                const xMin = Math.min(...xs)
                const xMax = Math.max(...xs)
                const yMin = Math.min(...ys)
                const yMax = Math.max(...ys)

                // Apply scale and offset
                const x = xMin * scaleX + imageOffset.x
                const y = yMin * scaleY + imageOffset.y
                const w = (xMax - xMin) * scaleX
                const h = (yMax - yMin) * scaleY

                return (
                  <g key={index}>
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      fill="none"
                      stroke="red"
                      strokeWidth="2"
                    />
                    <text
                      x={x + w / 2}
                      y={y + h / 2}
                      fill="red"
                      fontSize="16"
                      fontWeight="bold"
                      textAnchor="middle"
                      alignmentBaseline="middle"
                    >
                      {index + 1}
                    </text>
                  </g>
                )
              })}
            </svg>
          </>
        ) : (
          <span className="text-gray-700">Loading image...</span>
        )}
      </div>
      <div className="w-full max-w-4xl">
        <h3 className="mb-4 text-lg font-medium">Student Names</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {names.map((student, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-8 pt-4 text-center text-lg font-bold">
                {index + 1}
              </span>
              <TextField
                label={`Name ${index + 1}`}
                value={student.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleNameChange(index, e.target.value)
                }
                placeholder={`Enter name for student ${index + 1}`}
              />
              <button
                className="mt-4 flex h-9 items-center justify-center rounded-md border border-red-600 bg-white p-2 text-red-600 transition-colors hover:bg-red-600 hover:text-white"
                onClick={() => setNames(names.filter((_, i) => i !== index))}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* <div className="mt-4">
          <TextButton variant="secondary" onClick={handleAddName}>
            Add Name
          </TextButton>
        </div> */}
      </div>
      <div className="mt-6 flex gap-4">
        <TextButton variant="primary" onClick={handleSave}>
          Save Composite
        </TextButton>
      </div>
    </AdminLayout>
  )
}

export default CompositeViewPage
