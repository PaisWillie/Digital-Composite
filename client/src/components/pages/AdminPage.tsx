import { useNavigate } from 'react-router-dom'
import TextButton from 'components/Button/TextButton'

function AdminPage() {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="mb-6 text-2xl font-semibold">Admin Dashboard</h2>

      <div className="flex w-full max-w-sm flex-col gap-4">
        <TextButton
          variant="primary"
          onClick={() => handleNavigate('/admin/uploadPage')}
        >
          Upload Composite
        </TextButton>

        <TextButton
          variant="secondary"
          onClick={() => handleNavigate('/admin/manageCompositesPage')}
        >
          Manage Composites
        </TextButton>

        <TextButton
          variant="secondary"
          onClick={() => handleNavigate('/admin/blackListStudentPage')}
        >
          Black List Student
        </TextButton>

        <TextButton
          variant="secondary"
          onClick={() => handleNavigate('/admin/viewDashboardAnalyticsPage')}
        >
          View Dashboard Analytics
        </TextButton>
      </div>
    </div>
  )
}

export default AdminPage
