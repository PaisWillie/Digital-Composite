import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import App from 'components/App'
import AdminPage from 'components/pages/AdminPage'
import BlackListStudentPage from 'components/pages/BlackListStudentPage'
import CompositeViewPage from 'components/pages/CompositeViewPage'
import ManageCompositesPage from 'components/pages/ManageCompositesPage'
import SearchResultPage from 'components/pages/SearchResultPage'
import UploadPage from 'components/pages/UploadPage'
import ViewDashboardAnalyticsPage from 'components/pages/viewDashboardAnalyticsPage'
import { DataProvider } from 'context/DataContext'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useLocation
} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'tailwindcss/tailwind.css'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

// Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0()
  const location = useLocation()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: location.pathname }
    })
    return null
  }

  return children
}

// Define Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/view-all',
    element: <SearchResultPage />
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/uploadPage',
    element: (
      <ProtectedRoute>
        <UploadPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/compositeViewPage',
    element: (
      <ProtectedRoute>
        <CompositeViewPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/manageCompositesPage',
    element: (
      <ProtectedRoute>
        <ManageCompositesPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/blackListStudentPage',
    element: (
      <ProtectedRoute>
        <BlackListStudentPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/admin/viewDashboardAnalyticsPage',
    element: (
      <ProtectedRoute>
        <ViewDashboardAnalyticsPage />
      </ProtectedRoute>
    )
  },
  {
    path: '*',
    element: <Navigate to="/" />
  }
])

// Render the App with Auth0, Router, and ToastContainer
root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin + window.location.pathname
    }}
  >
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
    <ToastContainer />
  </Auth0Provider>
)
