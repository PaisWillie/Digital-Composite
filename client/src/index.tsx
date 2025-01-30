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

// Render the App with Auth0 and Router
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
  </Auth0Provider>
)
