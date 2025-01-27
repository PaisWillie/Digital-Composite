import TextButton from 'components/Button/TextButton'
import TextFieldWithButton from 'components/TextField/TextFieldWithButton'
import { useState } from 'react'
import {
  FaArrowRight,
  FaClockRotateLeft,
  FaFile,
  FaPlus
} from 'react-icons/fa6'

const SearchModal = () => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <div className="flex w-full max-w-screen-sm flex-col rounded-md border border-[#DBDBDD] bg-white p-6 shadow-xl">
      <TextFieldWithButton
        textFieldPlaceholder="Search by name, program, year"
        textFieldValue={searchValue}
        onTextFieldChange={(e) => setSearchValue(e.target.value)}
        buttonLabel={
          <div className="flex flex-row items-center">
            <span>Search</span>
            <FaArrowRight className="ml-[8px]" />
          </div>
        }
        onButtonClick={() => console.log('Searching...')}
      />
      <div id="filters" className="mt-3 flex flex-row gap-x-2">
        <TextButton
          onClick={() => {}}
          leadingIcon={<FaPlus />}
          isMobile
          variant="secondary"
        >
          Select year
        </TextButton>
        <TextButton
          onClick={() => {}}
          leadingIcon={<FaPlus />}
          isMobile
          variant="secondary"
        >
          Select program
        </TextButton>
      </div>
      <div className="mt-3 flex flex-col">
        <p className="font-poppins text-xs">Recent searches</p>
        <TextButton
          onClick={() => {}}
          leadingIcon={<FaClockRotateLeft className="text-sm" />}
          isMobile
          variant="tertiary"
        >
          Buu Ha, Software Engineering, 2025
        </TextButton>
        <TextButton
          onClick={() => {}}
          leadingIcon={<FaClockRotateLeft className="text-sm" />}
          isMobile
          variant="tertiary"
        >
          John Appleseed, 2022
        </TextButton>
      </div>
      <div className="mt-3 flex flex-col">
        <p className="font-poppins text-xs">Recently viewed</p>
        <TextButton
          onClick={() => {}}
          leadingIcon={<FaFile className="text-sm" />}
          isMobile
          variant="tertiary"
        >
          Computer Science, 2024
        </TextButton>
        <TextButton
          onClick={() => {}}
          leadingIcon={<FaFile className="text-sm" />}
          isMobile
          variant="tertiary"
        >
          Materials, 2019
        </TextButton>
      </div>
    </div>
  )
}

export default SearchModal
