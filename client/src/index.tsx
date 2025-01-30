import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLocation
} from 'react-router-dom'
import AdminPage from 'components/AdminPage'
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react'
import UploadPage from 'components/UploadPage'
import ManageCompositesPage from 'components/ManageCompositesPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CompositeViewPage from 'components/CompositeViewPage'

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
      redirect_uri: window.location.origin
    }}
    onRedirectCallback={(appState) => {
      window.history.replaceState(
        {},
        document.title,
        appState?.returnTo || window.location.pathname
      )
      window.location.reload()
    }}
  >
    <RouterProvider router={router} />
    <ToastContainer />
  </Auth0Provider>
)
