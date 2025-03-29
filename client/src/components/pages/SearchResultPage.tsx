import { Carousel, Modal, Progress, ProgressProps } from 'antd'
import TextButton from 'components/Button/TextButton'
import SingleComposite from 'components/Composite/SingleComposite'
import CroppedImage from 'components/CroppedImage/CroppedImage'
import { useData } from 'context/DataContext'
import Fuse from 'fuse.js'
import { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { useSearchParams } from 'react-router-dom'
import { parseProgram } from 'utils/parse'
import Layout from '../Layout/Layout'

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#800000', // Maroon
  '100%': '#b22222' // Firebrick
}

const SearchResultPage = () => {
  const [selectedCompositeId, setSelectedCompositeId] = useState(-1)

  const { data, loading, error } = useData()

  const [progress, setProgress] = useState(0) // Add state for progress
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

  const [searchParams] = useSearchParams()

  const selectedProgram = searchParams.get('program')
  const selectedYear = searchParams.get('year')
  const searchQuery = searchParams.get('search')

  const [filteredComposites, setFilteredComposites] = useState(
    data?.composites || []
  )

  useEffect(() => {
    if (data?.composites) {
      // If both program and year is selected, show exact composite
      if (selectedProgram && selectedYear) {
        setFilteredComposites(data.composites)

        // Find composite that matches the selected program and year
        const composite = data.composites.find(
          (composite) =>
            composite.program.program === selectedProgram &&
            composite.program.year === selectedYear
        )

        if (composite) {
          setSelectedCompositeId(data.composites.indexOf(composite))
        }
      } else if (selectedProgram) {
        setFilteredComposites(
          data?.composites.filter(
            (composite) => composite.program.program === selectedProgram
          ) || []
        )
      } else if (selectedYear) {
        setFilteredComposites(
          data?.composites.filter(
            (composite) => composite.program.year === selectedYear
          ) || []
        )
      } else {
        setFilteredComposites(data.composites)
      }

      if (searchQuery) {
        const fuse = new Fuse(data?.searchOptions || [], {
          keys: ['value'],
          threshold: 0.2
        })

        const results = fuse.search(searchQuery).map((result) => result.item)

        // Filter by remaining composites in filteredComposites that match the value of the search query
        setFilteredComposites(
          (prev) =>
            prev.filter((composite) =>
              results.some((result) => composite.program === result.program)
            ) || []
        )
      }
    }
    // TODO: Fix the exhaustive-deps warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProgram, selectedYear, data])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 99) {
            clearInterval(interval!)
            return 99
          }
          return prev + 5
        })
      }, 1) // Adjust the interval duration as needed
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [loading]) // Run effect when loading changes

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onStudentClick = (
    src: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    name: string
  ) => {
    setModalContent(
      <div className="flex flex-col items-center gap-y-2 text-center">
        <CroppedImage src={src} x1={x1} y1={y1} x2={x2} y2={y2} />
        <p className="font-poppins text-center font-medium">{name}</p>
      </div>
    )
    showModal()
  }

  // TODO: pressing back button will return back to same position in carousel
  // TODO: add (non-white) arrows to Carousel to make it more accessible

  if (loading) {
    return (
      <Layout>
        <Progress
          strokeColor={twoColors}
          percent={progress}
          showInfo={false}
          className="opacity-25"
        />
      </Layout>
    )
  }

  if (error) {
    return <Layout>Error: {error}</Layout>
  }

  return (
    <Layout>
      <div className="flex flex-col">
        {selectedCompositeId === -1 ? (
          <>
            {searchQuery && (
              <p className="font-poppins text-start text-lg font-medium">
                Search results for:{' '}
                <span className="font-normal">{searchQuery}</span>
              </p>
            )}
            <Carousel
              arrows
              easing="ease-in"
              speed={1500}
              infinite={false}
              slidesPerRow={3}
              rows={3}
            >
              {filteredComposites.map((composite, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCompositeId(index)
                  }}
                  className="flex flex-col items-center gap-y-2"
                >
                  <img key={index} src={composite.src} />
                  <p className="font-poppins text-center font-medium">
                    {parseProgram(composite.program.program)}
                    {', '}
                    {composite.program.year}
                  </p>
                </div>
              ))}
            </Carousel>
            {/* TODO: Re-add filter implementation */}
            {/* <div id="filters" className="mt-3 flex flex-row gap-x-2">
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
            </div> */}
          </>
        ) : (
          <>
            <Modal
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              footer={null}
              centered
            >
              <div className="flex flex-col items-center">{modalContent}</div>
            </Modal>
            <SingleComposite
              index={selectedCompositeId}
              src={filteredComposites[selectedCompositeId].src || ''}
              students={filteredComposites[selectedCompositeId].students || []}
              onStudentClick={onStudentClick}
            />
            <div className="flex flex-row justify-evenly items-center">
              <div className="max-w-fit">
                <TextButton
                  onClick={() => {
                    setSelectedCompositeId(-1)
                  }}
                  leadingIcon={<FaArrowLeft />}
                  isMobile
                >
                  Back
                </TextButton>
              </div>
              <p className="flex w-full flex-row justify-center italic text-gray-500 font-poppins mb-4">
                Need your photo removed? Contact
                <span className="ml-1 underline">engalum@mcmaster.ca</span>
              </p>
              <div />
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}

export default SearchResultPage
