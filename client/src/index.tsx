import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminPage from 'components/AdminPage'
import SearchResultPage from 'components/SearchResultPage'
import CompositeViewPage from 'components/CompositeViewPage'
import UploadPage from 'components/UploadPage'
import ManageCompositesPage from 'components/ManageCompositesPage'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/admin',
    element: <AdminPage />
  },
  {
    path: '/view-all',
    element: <SearchResultPage />
  },
  {
    path: 'Admin/CompositeViewPage',
    element: <CompositeViewPage />
  },
  {
    path: 'Admin/UploadPage',
    element: <UploadPage />
  },
  {
    path: 'Admin/ManageCompositesPage',
    element: <ManageCompositesPage />
  }
])

root.render(<RouterProvider router={router} />)
