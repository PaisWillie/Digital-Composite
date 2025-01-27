import IconButton from 'components/Button/IconButton'
import { FaBars, FaCircleQuestion, FaMagnifyingGlass } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <nav className="flex h-screen flex-col items-center justify-center gap-y-4">
      <IconButton onClick={() => {}} icon={<FaMagnifyingGlass />} />
      <IconButton href="/search" onClick={() => {}} icon={<FaBars />} />
      <IconButton
        href="/about"
        onClick={() => {}}
        icon={<FaCircleQuestion />}
      />
    </nav>
  )
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="grid grid-cols-12">
      <Navbar />
      <main className="col-span-10">{children}</main>
      <Navbar />
    </div>
  )
}

export default Layout
