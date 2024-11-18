import { SearchOutlined } from '@ant-design/icons'
import { Button, Carousel, Input, Modal, Select } from 'antd'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'

type Composite = {
  src: string
  program: string
  year: number
}

const composites: Composite[] = [
  {
    src: '/images/composites/MATERIALS 2024 Final.jpg',
    program: 'Materials Science',
    year: 2024
  },
  { src: '/images/composites/B_Tech_2020.png', program: 'B. Tech', year: 2020 },
  {
    src: '/images/composites/B-Tech 2024 Final.jpg',
    program: 'B. Tech',
    year: 2024
  },
  { src: '/images/composites/BTech_2021.png', program: 'B. Tech', year: 2021 },
  { src: '/images/composites/BTech_2022.jpg', program: 'B. Tech', year: 2022 },
  { src: '/images/composites/BTech_2023.jpg', program: 'B. Tech', year: 2023 },
  {
    src: '/images/composites/Chem Eng 2024.jpg',
    program: 'Chemical Engineering',
    year: 2024
  },
  {
    src: '/images/composites/Chemical_2023.jpg',
    program: 'Chemical Engineering',
    year: 2023
  },
  {
    src: '/images/composites/Civil_Eng_2023.jpg',
    program: 'Civil Engineering',
    year: 2023
  },
  // {
  //   src: '/images/composites/Class_of_2020.png',
  //   program: 'Class of 2020',
  //   year: 2020
  // },
  // {
  //   src: '/images/composites/Class-of-2022.jpg',
  //   program: 'Class of 2022',
  //   year: 2022
  // },
  {
    src: '/images/composites/Computer Science 2024 Final.jpg',
    program: 'Computer Science',
    year: 2024
  },
  {
    src: '/images/composites/Computer_Eng_2023.jpg',
    program: 'Computer Engineering',
    year: 2023
  },
  {
    src: '/images/composites/Computer_Science_2020.png',
    program: 'Computer Science',
    year: 2020
  },
  {
    src: '/images/composites/Computer_Science_2021.png',
    program: 'Computer Science',
    year: 2021
  },
  {
    src: '/images/composites/Computer_Science_2022.jpg',
    program: 'Computer Science',
    year: 2022
  },
  {
    src: '/images/composites/Computer_Science_2023.jpg',
    program: 'Computer Science',
    year: 2023
  },
  {
    src: '/images/composites/ELECTRICAL 2024 Final.jpg',
    program: 'Electrical Engineering',
    year: 2024
  },
  {
    src: '/images/composites/Electrical_2023.jpg',
    program: 'Electrical Engineering',
    year: 2023
  },
  {
    src: '/images/composites/Eng_Phys_2023.jpg',
    program: 'Engineering Physics',
    year: 2023
  },
  {
    src: '/images/composites/Engineering Physics 2024 Final.jpg',
    program: 'Engineering Physics',
    year: 2024
  },
  // {
  //   src: '/images/composites/Engineering_Class_2021.jpg',
  //   program: 'Engineering',
  //   year: 2021
  // },
  {
    src: '/images/composites/IBEHS 2024 Final.jpg',
    program: 'iBioMed',
    year: 2024
  },
  {
    src: '/images/composites/iBioMed_2021.png',
    program: 'iBioMed',
    year: 2021
  },
  {
    src: '/images/composites/iBioMed_2022.jpg',
    program: 'iBioMed',
    year: 2022
  },
  {
    src: '/images/composites/IBioMed_2023.jpeg',
    program: 'iBioMed',
    year: 2023
  },
  {
    src: '/images/composites/MATERIALS 2024 Final.jpg',
    program: 'Materials Science',
    year: 2024
  },
  {
    src: '/images/composites/Materials_2023.jpg',
    program: 'Materials Science',
    year: 2023
  },
  {
    src: '/images/composites/MECHANICAL 2024 FINAL.jpg',
    program: 'Mechanical Engineering',
    year: 2024
  },
  {
    src: '/images/composites/Mechanical_2023.jpg',
    program: 'Mechanical Engineering',
    year: 2023
  },
  {
    src: '/images/composites/Mechatronics_2023.jpg',
    program: 'Mechatronics Engineering',
    year: 2023
  },
  {
    src: '/images/composites/SOFTWARE 2024 Final.jpg',
    program: 'Software Engineering',
    year: 2024
  },
  {
    src: '/images/composites/Software_2023.jpg',
    program: 'Software Engineering',
    year: 2023
  }
]

function App() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const [searchInputValue, setSearchInputValue] = useState('')
  const [viewingComposite, setViewingComposite] = useState<Composite | null>(
    null
  )

  const [filterProgram, setFilterProgram] = useState('All')
  const [filterYear, setFilterYear] = useState('All')

  const [results, setResults] = useState<Composite[]>([])

  const showSearchModal = () => {
    setIsSearchModalOpen(true)
  }

  const handleOk = () => {
    setIsSearchModalOpen(false)
  }

  const handleCancel = () => {
    setIsSearchModalOpen(false)
  }

  useEffect(() => {
    const fuse = new Fuse(composites, {
      keys: ['program', 'year'],
      includeScore: true
    })

    if (searchInputValue) {
      setResults(fuse.search(searchInputValue).map((result) => result.item))
    } else {
      setResults([])
    }
  }, [searchInputValue])

  return (
    <div className="flex h-screen flex-col overflow-y-hidden overflow-x-scroll">
      <div className="flex w-full flex-row items-center gap-x-4 px-4">
        {/* Search bar */}
        <div className="flex-[3] p-3">
          <div
            onClick={showSearchModal}
            className="w-full cursor-text rounded-full border-2 border-slate-200 bg-slate-100 p-3"
          >
            Search bar
          </div>
        </div>
        {/* filter by program */}
        <div className="flex flex-[2] flex-col gap-y-1">
          <p>Program</p>
          <Select
            defaultValue="All"
            // style={{ width: 120 }}
            onChange={(value) => {
              setFilterProgram(value)
            }}
            options={Array.from(
              new Set(composites.map((composite) => composite.program))
            ).map((program) => ({
              value: program,
              label: program
            }))}
          />
        </div>
        {/* filter by year */}
        <div className="flex flex-[1] flex-col gap-y-1">
          <p>Year</p>
          <Select
            defaultValue="All"
            // style={{ width: 120 }}
            onChange={(value) => {
              setFilterYear(value)
            }}
            options={[
              {
                value: 'All',
                label: 'All'
              },
              {
                value: '2020',
                label: '2020'
              },
              {
                value: '2021',
                label: '2021'
              },
              {
                value: '2022',
                label: '2022'
              },
              {
                value: '2023',
                label: '2023'
              },
              {
                value: '2024',
                label: '2024'
              }
            ]}
          />
        </div>
        {/* reset button */}
        <Button
          type="primary"
          danger
          onClick={() => {
            setSearchInputValue('')
            setResults([])
            setViewingComposite(null)
            setFilterProgram('All')
            setFilterYear('All')
          }}
        >
          Reset
        </Button>
      </div>

      <Modal
        title={
          <Input
            placeholder="Search by program, year, or name"
            // variant="borderless"
            prefix={<SearchOutlined />}
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
          />
        }
        open={isSearchModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
        centered
        // styles={{
        //   content: {
        //     paddingLeft: 0,
        //     paddingRight: 0
        //   }
        // }}
      >
        {/* <hr /> */}
        {/* <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p> */}
        <div className="min-h-72">
          <div className="flex flex-col items-start gap-y-1">
            {results.slice(0, 8).map((composite, index) => (
              <div
                key={index}
                className="flex cursor-pointer flex-col items-center justify-center rounded-full bg-blue-600 px-3 py-1 text-white"
                onClick={() => setViewingComposite(composite)}
              >
                {composite.program} - {composite.year}
              </div>
            ))}
          </div>
        </div>
      </Modal>
      {viewingComposite ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src={viewingComposite.src}
            className="size-full object-contain"
          />
          <div className="text-2xl font-bold">
            {viewingComposite.program} - {viewingComposite.year}
          </div>
        </div>
      ) : filterProgram !== 'All' || filterYear !== 'All' ? (
        // Display grid list of composites (their images) based on filter
        // If any composite image is clicked, set the viewingComposite to that composite
        <div className="grid grid-cols-3 gap-4 p-4">
          {composites
            .filter(
              (composite) =>
                (filterProgram === 'All' ||
                  composite.program === filterProgram) &&
                (filterYear === 'All' || composite.year === +filterYear)
            )
            .map((composite, index) => (
              <img
                key={index}
                src={composite.src}
                className="size-full object-contain"
                onClick={() => setViewingComposite(composite)}
              />
            ))}
        </div>
      ) : (
        <Carousel
          autoplay
          infinite
          autoplaySpeed={10000}
          easing="ease-in"
          speed={1500}
        >
          {composites.map((composite, index) => (
            <img
              key={index}
              src={composite.src}
              className="size-full object-contain"
            />
          ))}
        </Carousel>
      )}
    </div>
  )
}

export default App
