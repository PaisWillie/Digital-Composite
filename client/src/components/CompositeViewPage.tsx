import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, ChangeEvent } from 'react'
import TextButton from 'components/Button/TextButton'
import TextField from 'components/TextField/TextField'
import Dropdown from 'components/Dropdown/Dropdown'

function CompositeViewPage() {
  const location = useLocation()
  const navigate = useNavigate()

  const compositeData = location.state || {}
  const [program, setProgram] = useState(compositeData.program || '')
  const [year, setYear] = useState(compositeData.year || '')
  const [names, setNames] = useState<string[]>(compositeData.names || [])
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    if (compositeData.file) {
      const reader = new FileReader()
      reader.onload = (e) => setImageSrc(e.target?.result as string)
      reader.readAsDataURL(compositeData.file)
    }
  }, [compositeData.file])

  const handleNameChange = (index: number, newName: string) => {
    const updatedNames = [...names]
    updatedNames[index] = newName
    setNames(updatedNames)
  }

  const handleAddName = () => {
    setNames([...names, ''])
  }

  const handleSave = () => {
    const updatedComposite = {
      id: compositeData.id || 'new-id',
      program,
      year,
      names
    }

    // Pass the updated composite as part of an array to ManageCompositesPage
    navigate('/Admin/ManageCompositesPage', {
      state: [updatedComposite] // Pass an array to state
    })
  }

  const handleBackToComposites = () => {
    navigate('/Admin/ManageCompositesPage')
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Edit Composite</h2>

      {/* Composite Image Display */}
      <div className="mb-6 flex h-96 w-full max-w-4xl items-center justify-center rounded-lg bg-gray-300">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Composite"
            className="max-h-full max-w-full rounded-lg"
          />
        ) : (
          <span className="text-gray-700">Loading image...</span>
        )}
      </div>

      {/* Editable Program and Year */}
      <div className="mb-6 w-full max-w-xl">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Program
          </label>
          <Dropdown
            options={['Electrical', 'Mechanical', 'Software Engineering']}
            selectedValue={program}
            onSelect={setProgram}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <Dropdown
            options={['2022', '2023', '2024']}
            selectedValue={year}
            onSelect={setYear}
          />
        </div>
      </div>

      {/* Editable Names List */}
      <div className="w-full max-w-2xl">
        <h3 className="mb-4 text-lg font-medium">Student Names</h3>
        <div className="flex flex-col gap-4">
          {names.map((name, index) => (
            <div key={index} className="flex items-center gap-2">
              <TextField
                label={`Name ${index + 1}`}
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleNameChange(index, e.target.value)
                }
                placeholder={`Enter name for student ${index + 1}`}
              />
              <TextButton
                variant="tertiary"
                onClick={() => setNames(names.filter((_, i) => i !== index))}
              >
                Remove
              </TextButton>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <TextButton variant="secondary" onClick={handleAddName}>
            Add Name
          </TextButton>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <TextButton variant="primary" onClick={handleSave}>
          Save and Go to Manage Composites
        </TextButton>
        <TextButton variant="secondary" onClick={handleBackToComposites}>
          Back to Composites
        </TextButton>
      </div>
    </div>
  )
}

export default CompositeViewPage
