// TODO: Remove this later
/* eslint-disable @typescript-eslint/no-unused-vars */

import TextButton from 'components/Button/TextButton'
import TextFieldWithButton from 'components/TextField/TextFieldWithButton'
import { SearchOption, useData } from 'context/DataContext'
import { useState } from 'react'
import { FaArrowRight, FaFile, FaUser } from 'react-icons/fa6'

import { parseProgram } from 'utils/parse'

type SearchModalProps = {
  searchValue: string
  onSearchFieldChange: (searchValue: string) => void
  searchResults: SearchOption[]
  handleSearchButtonClick: (year?: string, program?: string) => void
}

const SearchModal = ({
  searchValue,
  onSearchFieldChange,
  searchResults,
  handleSearchButtonClick
}: SearchModalProps) => {
  const { data } = useData()

  const [year, setYear] = useState<{ label: string; value: string } | null>(
    null
  )
  const [program, setProgram] = useState<{
    label: string
    value: string
  } | null>(null)

  return (
    <div className="flex w-full max-w-screen-sm flex-col">
      <TextFieldWithButton
        textFieldPlaceholder="Search by name, program, year"
        textFieldValue={searchValue}
        onTextFieldChange={(e) => {
          onSearchFieldChange(e.target.value)
        }}
        buttonLabel={
          <div className="flex flex-row items-center">
            <span>Search</span>
            <FaArrowRight className="ml-[8px]" />
          </div>
        }
        onButtonClick={() => {
          handleSearchButtonClick(year?.value, program?.value)
        }}
      />
      {/* <div id="filters" className="mt-3 flex flex-row gap-x-2"> */}
      {/* <TextButton
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
        </TextButton> */}
      {/* <Select
          // Get unique years from all of data.composites.program.year
          options={data?.composites
            .map((composite) => composite.program.year)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((year) => {
              return { label: year, value: year }
            })}
          value={year}
          onChange={setYear}
          isClearable
          placeholder="Select Year"
        />
        <Select
          // Get unique programs from all of data.composites.program.program
          options={data?.composites
            .map((composite) => composite.program.program)
            .filter((value, index, self) => self.indexOf(value) === index)
            .map((program) => {
              return { label: parseProgram(program), value: program }
            })}
          value={program}
          onChange={setProgram}
          isClearable
          placeholder="Select Program"
        /> */}
      {/* </div> */}
      {searchResults.length !== 0 ? (
        <div className="mt-3 flex flex-col">
          <p className="font-poppins text-xs">Suggestions</p>
          {searchResults.slice(0, 10).map((result, index) => {
            return result.type === 'student' ? (
              <TextButton
                key={index}
                href={`/view-all?program=${result.program.program}&year=${result.program.year}`}
                leadingIcon={<FaUser className="text-sm" />}
                isMobile
                variant="tertiary"
              >
                {result.value}
              </TextButton>
            ) : (
              <TextButton
                key={index}
                href={`/view-all?program=${result.program.program}&year=${result.program.year}`}
                leadingIcon={<FaFile className="text-sm" />}
                isMobile
                variant="tertiary"
              >
                {parseProgram(result.value.split(',')[0])},{' '}
                {result.value.split(',')[1]}
              </TextButton>
            )
          })}
        </div>
      ) : (
        <>
          {/* <div className="mt-3 flex flex-col">
            <p className="font-poppins text-xs">Recent searches</p>
            <TextButton
              onClick={() => {}}
              leadingIcon={<FaClockRotateLeft className="text-sm" />}
              href="/view-all?program=SoftwareEngineering&year=2025&search=Buu Ha"
              isMobile
              variant="tertiary"
            >
              Buu Ha, Software Engineering, 2025
            </TextButton>
            <TextButton
              onClick={() => {}}
              leadingIcon={<FaClockRotateLeft className="text-sm" />}
              href="/view-all?search=John Appleseed"
              isMobile
              variant="tertiary"
            >
              John Appleseed, 2022
            </TextButton>
          </div> */}
          <div className="mt-3 flex flex-col">
            <p className="font-poppins text-xs">Suggestions</p>
            <p className="mt-2 font-poppins text-xs italic text-gray-400">
              Begin typing to search...
            </p>
            {/* <p className="font-poppins text-xs">Recently viewed</p>
            <TextButton
              onClick={() => {}}
              leadingIcon={<FaFile className="text-sm" />}
              href="/view-all?program=CivilEngineering&year=2024"
              isMobile
              variant="tertiary"
            >
              Civil Engineering, 2024
            </TextButton>
            <TextButton
              onClick={() => {}}
              leadingIcon={<FaFile className="text-sm" />}
              href="/view-all?program=SoftwareEngineering&year=2024"
              isMobile
              variant="tertiary"
            >
              Software Engineering, 2024
            </TextButton>
            <TextButton
              onClick={() => {}}
              leadingIcon={<FaFile className="text-sm" />}
              href="/view-all?program=Mechatronics&year=2024"
              isMobile
              variant="tertiary"
            >
              Mechatronics, 2024
            </TextButton>
            <TextButton
              onClick={() => {}}
              leadingIcon={<FaFile className="text-sm" />}
              href="/view-all?program=IBEHS&year=2023"
              isMobile
              variant="tertiary"
            >
              IBEHS, 2023
            </TextButton> */}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchModal
