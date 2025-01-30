import { useLocation, useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'

interface Composite {
  id: string
  program: string
  year: string
  names: string[]
}

function ManageCompositesPage() {
  const location = useLocation()
  const composites: Composite[] = Array.isArray(location.state)
    ? location.state
    : []

  console.log('Received composites:', composites) // Debug log to verify state

  const navigate = useNavigate()

  const handleEdit = (composite: Composite) => {
    navigate('/Admin/CompositeViewPage', { state: composite })
  }

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this composite?'
    )
    if (confirmDelete) {
      const updatedComposites = composites.filter((comp) => comp.id !== id)
      navigate('/Admin/ManageCompositesPage', { state: updatedComposites })
    }
  }

  const handleBackToAdmin = () => {
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Manage Composites</h2>

      {composites.length === 0 ? (
        <p className="text-gray-500">
          No composites available. Ensure you save a composite first.
        </p>
      ) : (
        <table className="w-full max-w-4xl border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Program</th>
              <th className="border p-2">Year</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {composites.map((composite, index) => (
              <tr key={index}>
                <td className="border p-2">{composite.program}</td>
                <td className="border p-2">{composite.year}</td>
                <td className="flex gap-2 border p-2">
                  <TextButton
                    variant="primary"
                    onClick={() => handleEdit(composite)}
                  >
                    Edit
                  </TextButton>
                  <TextButton
                    variant="tertiary"
                    onClick={() => handleDelete(composite.id)}
                  >
                    Delete
                  </TextButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-6">
        <TextButton variant="secondary" onClick={handleBackToAdmin}>
          Back to Admin
        </TextButton>
      </div>
    </div>
  )
}

export default ManageCompositesPage
