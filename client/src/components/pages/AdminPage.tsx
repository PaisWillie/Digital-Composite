import AdminLayout from 'components/Layout/AdminLayout'

function AdminPage() {
  return (
    <AdminLayout currPageHref="/admin">
      {/* <h2 className="mb-6 text-2xl font-semibold">Admin Dashboard</h2>

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
          onClick={() => handleNavigate('/admin/removeStudentPage')}
        >
          Remove Student
        </TextButton>

        <TextButton
          variant="secondary"
          onClick={() => handleNavigate('/admin/viewDashboardAnalyticsPage')}
        >
          View Dashboard Analytics
        </TextButton>
      </div> */}
      <p className="font-poppins text-grey-600 pt-12">
        Select a task from the navigation bar above to get started.
      </p>
    </AdminLayout>
  )
}

export default AdminPage
