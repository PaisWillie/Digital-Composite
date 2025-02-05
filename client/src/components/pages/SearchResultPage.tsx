import Layout from '../Layout/Layout'
import { Carousel, Modal } from 'antd'
import { FaArrowLeft, FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import TextButton from 'components/Button/TextButton'
import { useData } from 'context/DataContext'
import SingleComposite from 'components/Composite/SingleComposite'
import CroppedImage from 'components/CroppedImage/CroppedImage'
import { programOptions } from 'utils/constants'

const SearchResultPage = () => {
  const [selectedCompositeId, setSelectedCompositeId] = useState(-1)

  const { data, loading, error } = useData()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

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
    y2: number
  ) => {
    setModalContent(<CroppedImage src={src} x1={x1} y1={y1} x2={x2} y2={y2} />)
    showModal()
  }

  // TODO: pressing back button will return back to same position in carousel
  // TODO: add (non-white) arrows to Carousel to make it more accessible

  if (loading) {
    return <Layout>Loading...</Layout>
  }

  if (error) {
    return <Layout>Error: {error}</Layout>
  }

  return (
    <Layout>
      <div className="flex flex-col">
        {selectedCompositeId === -1 ? (
          <>
            <Carousel
              easing="ease-in"
              speed={1500}
              arrows
              infinite={false}
              slidesPerRow={3}
              rows={3}
            >
              {data?.composites.map((composite, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCompositeId(index)
                  }}
                  className="flex flex-col items-center gap-y-2"
                >
                  <img key={index} src={composite.src} />
                  <p className="font-poppins text-center font-medium">
                    {programOptions.find(
                      (program) => program.value === composite.program.program
                    )?.label ?? ''}{' '}
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
              closeIcon={null}
              centered
            >
              <div className="flex flex-col items-center">{modalContent}</div>
            </Modal>
            <SingleComposite
              index={selectedCompositeId}
              src={data?.composites[selectedCompositeId].src || ''}
              students={data?.composites[selectedCompositeId].students || []}
              onStudentClick={onStudentClick}
            />
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
          </>
        )}
      </div>
    </Layout>
  )
}

export default SearchResultPage
