import { Modal } from 'antd'
import IconButton from 'components/Button/IconButton'
import SearchModal from 'components/Layout/SearchModal/SearchModal'
import { SearchOption, useData } from 'context/DataContext'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { FaBars, FaHouse, FaMagnifyingGlass, FaQuestion } from 'react-icons/fa6'
import { useLocation, useNavigate } from 'react-router-dom'
import OnScreenKeyboard from './OnScreenKeyboard/OnScreenKeyboard'
import { cn } from '@udecode/cn'

type NavbarProps = {
  showSearchModal: () => void
  showInstructionModal: () => void
  className?: string
}

const Navbar = ({
  showSearchModal,
  showInstructionModal,
  className
}: NavbarProps) => {
  const location = useLocation()

  return (
    <nav
      className={cn([
        'flex flex-col items-center justify-center gap-y-4',
        className
      ])}
    >
      <IconButton onClick={showSearchModal} icon={<FaMagnifyingGlass />} />
      <IconButton href="/view-all" icon={<FaBars />} />
      {location.pathname !== '/' ? (
        <IconButton href="/" icon={<FaHouse />} />
      ) : (
        <IconButton onClick={showInstructionModal} icon={<FaQuestion />} />
      )}
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

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false)

  const [searchResults, setSearchResults] = useState<SearchOption[]>([])

  const [fuse, setFuse] = useState<Fuse<SearchOption> | null>(null)

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      setFuse(
        new Fuse(data.searchOptions, {
          keys: ['value'],
          threshold: 0.2
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
    setIsSearchModalOpen(false)
    setIsInstructionModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setIsSearchModalOpen(false)
    setIsInstructionModalOpen(false)
  }

  const handleSearchButtonClick = (year?: string, program?: string) => {
    let url = ''

    if (year) {
      url += `&year=${year}`
    }

    if (program) {
      url += `&program=${program}`
    }

    navigate(`/view-all?search=${searchValue}${url}`, { replace: true })
    navigate(0)
  }

  const showSearchModal = () => {
    setIsSearchModalOpen(true)
    showModal()
  }

  const showInstructionModal = () => {
    setIsInstructionModalOpen(true)
    showModal()
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
    <div className="flex flex-col h-screen">
      <div className="py-3 bg-linkText text-white font-poppins font-medium flex flex-col items-center border-b-[3px] border-[#FDBF57]">
        <h1>McMaster Engineering Class Composite Display</h1>
        <h2 className="text-sm font-light italic">
          Find yourself and your classmates!
        </h2>
      </div>
      <div className="grid grid-cols-12 flex-1">
        <Navbar
          showSearchModal={showSearchModal}
          showInstructionModal={showInstructionModal}
          className="col-span-2 ipad:col-span-1 xl:col-span-3 2xl:col-span-4"
        />
        <Modal
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          closeIcon={!isSearchModalOpen}
          centered={!isSearchModalOpen}
          width={!isSearchModalOpen ? 1000 : undefined}
        >
          {isSearchModalOpen && (
            <SearchModal
              searchValue={searchValue}
              onSearchFieldChange={handleSearchValueChange}
              searchResults={searchResults}
              handleSearchButtonClick={handleSearchButtonClick}
            />
          )}
          {isInstructionModalOpen && (
            <div className="p-4">
              <img src="/GradSight-Instructions.png" />
            </div>
          )}
        </Modal>
        {isSearchModalOpen && (
          <div className="fixed bottom-0 left-1/2 z-[1500] flex w-full -translate-x-1/2 flex-row justify-center bg-white p-6">
            <div className="w-full max-w-screen-md">
              <OnScreenKeyboard onPress={onKeyPress} />
            </div>
          </div>
        )}
        <main className="col-span-8 ipad:col-span-10 xl:col-span-6 2xl:col-span-4 flex h-full flex-col justify-center">
          {children}
        </main>
        <Navbar
          showSearchModal={showSearchModal}
          showInstructionModal={showInstructionModal}
          className="col-span-2 ipad:col-span-1 xl:col-span-3 2xl:col-span-4"
        />
      </div>
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
