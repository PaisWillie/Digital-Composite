import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'components/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminPage from 'components/AdminPage'

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
  }
])

root.render(<RouterProvider router={router} />)
