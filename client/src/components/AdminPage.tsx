import { useState, ChangeEvent } from 'react'

function AdminPage() {
  const [file, setFile] = useState<File | null>(null)
  const [program, setProgram] = useState('')
  const [imageName, setImageName] = useState('')
  const [names, setNames] = useState<string[]>([])
  const [editedNames, setEditedNames] = useState<string[]>([])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async () => {
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    formData.append('program', program)
    formData.append('imageName', imageName)

    // Example call
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    setNames(data.names || [])
    setEditedNames(data.names || [])
  }

  const handleNamesChange = (index: number, newVal: string) => {
    const updated = [...editedNames]
    updated[index] = newVal
    setEditedNames(updated)
  }

  const handleResubmit = async () => {
    // Example resubmit
    await fetch('/api/upload-names', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ editedNames })
    })
  }

  return (
    <div className="p-4">
      <div className="mb-2">
        <label>Program:</label>
        <select value={program} onChange={(e) => setProgram(e.target.value)}>
          <option value="">Select program</option>
          <option value="electrical">Electrical</option>
          <option value="mechanical">Mechanical</option>
        </select>
      </div>
      <div className="mb-2">
        <label>Image Name:</label>
        <input
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          type="text"
          placeholder="Image Name"
        />
      </div>
      <div className="mb-2">
        <label>Upload File:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button onClick={handleSubmit}>Upload</button>
      <div className="mt-4">
        {names.length > 0 && (
          <>
            <h3>Returned Names:</h3>
            {editedNames.map((n, i) => (
              <div key={i}>
                <input
                  value={n}
                  onChange={(e) => handleNamesChange(i, e.target.value)}
                />
              </div>
            ))}
            <button onClick={handleResubmit}>Resubmit</button>
          </>
        )}
      </div>
    </div>
  )
}
export default AdminPage
