import { Modal } from 'antd'
import IconButton from 'components/Button/IconButton'
import SearchModal from 'components/Layout/SearchModal/SearchModal'
import { SearchOption, useData } from 'context/DataContext'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { FaBars, FaMagnifyingGlass } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import OnScreenKeyboard from './OnScreenKeyboard/OnScreenKeyboard'

type NavbarProps = {
  showModal: () => void
}

const Navbar = ({ showModal }: NavbarProps) => {
  return (
    <nav className="flex flex-col items-center justify-center gap-y-4">
      <IconButton onClick={showModal} icon={<FaMagnifyingGlass />} />
      <IconButton href="/view-all" onClick={() => {}} icon={<FaBars />} />
      {/* <IconButton
        href="/about"
        onClick={() => {}}
        icon={<FaCircleQuestion />}
      /> */}
    </nav>
  )
}

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { data } = useData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const [searchResults, setSearchResults] = useState<SearchOption[]>([])

  const [fuse, setFuse] = useState<Fuse<SearchOption> | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setFuse(
        new Fuse(data.searchOptions, {
          keys: ['value'],
          threshold: 0.4
        })
      )
    }
  }, [data])

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value)

    if (value.length === 0 || !fuse) {
      // TODO: clear search results
      setSearchResults([])

      return
    }

    const results = fuse.search(value)
    const items = results.map((result) => result.item)
    setSearchResults(items)
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleSearchButtonClick = () => {
    navigate(`/view-all?search=${searchValue}`, { replace: true })
    navigate(0)
  }

  const onKeyPress = (keyPressed: string) => {
    // if keyPress is backspace, remove last character from searchValue
    if (keyPressed === 'backspace') {
      handleSearchValueChange(searchValue.slice(0, -1))
    } else if (keyPressed === 'space') {
      handleSearchValueChange(searchValue + ' ')
    } else if (keyPressed === 'return') {
      handleCancel()
    } else if (keyPressed === 'search') {
      handleSearchButtonClick()
    } else {
      handleSearchValueChange(searchValue + keyPressed)
    }
  }

  return (
    <div className="grid h-screen grid-cols-12">
      <Navbar showModal={showModal} />
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        closeIcon={null}
      >
        <SearchModal
          searchValue={searchValue}
          onSearchFieldChange={handleSearchValueChange}
          searchResults={searchResults}
        />
      </Modal>
      {isModalOpen && (
        <div className="fixed bottom-0 left-1/2 z-[1500] flex w-full -translate-x-1/2 flex-row justify-center bg-white p-6">
          <div className="w-full max-w-screen-md">
            <OnScreenKeyboard onPress={onKeyPress} />
          </div>
        </div>
      )}
      <main className="col-span-10 flex h-full flex-col justify-center">
        {children}
      </main>
      <Navbar showModal={showModal} />
    </div>

    // WIP: navbar on bottom

    // <div className="gap-y-12 flex-col flex justify-between ">
    //   <main className="">
    //     <Modal
    //       open={isModalOpen}
    //       onOk={handleOk}
    //       onCancel={handleCancel}
    //       footer={null}
    //       closeIcon={null}
    //     >
    //       <SearchModal
    //         searchValue={searchValue}
    //         setSearchValue={setSearchValue}
    //       />
    //     </Modal>
    //     {isModalOpen && (
    //       <div className="fixed bottom-0 left-1/2 z-[1500] flex w-full -translate-x-1/2 flex-row justify-center bg-white p-6">
    //         <div className="w-full max-w-screen-md">
    //           <OnScreenKeyboard onPress={onKeyPress} />
    //         </div>
    //       </div>
    //     )}
    //     {children}
    //   </main>
    //   <Navbar showModal={showModal} />
    // </div>
  )
}

export default Layout
