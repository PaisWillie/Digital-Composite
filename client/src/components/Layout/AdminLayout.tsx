import { cn } from '@udecode/cn'
import { useNavigate } from 'react-router-dom'

const navItems = [
  { name: 'Home', href: '/admin' },
  { name: 'Upload Composite', href: '/admin/uploadPage' },
  { name: 'Manage Composite', href: '/admin/manageCompositesPage' },
  { name: 'Remove Student', href: '/admin/removeStudentPage' }
]

const AdminLayout = ({
  children,
  currPageHref
}: {
  children: React.ReactNode
  currPageHref: string
}) => {
  const navigate = useNavigate()

  const handleNavigate = (path: string) => {
    navigate(path)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <div className="py-12 text-center bg-linkText w-screen text-white">
        <h1 className="font-poppins text-3xl font-bold">Admin Panel</h1>
        <h2 className="font-poppins text-sm font-medium">
          McMaster Engineering Class Composite Display
        </h2>
      </div>
      <nav className="w-screen flex flex-row justify-center bg-white border-t-8 border-[#FDBF57] shadow-lg">
        {navItems.map((item) => (
          <div
            key={item.name}
            className={cn([
              'px-8 py-6 border shadow-lg font-poppins font-semibold cursor-pointer',
              currPageHref === item.href
                ? 'bg-[#850044] text-white'
                : 'bg-white text-gray-600'
            ])}
            onClick={() => handleNavigate(item.href)}
          >
            {item.name}
          </div>
        ))}
      </nav>
      <div className="p-6 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default AdminLayout
