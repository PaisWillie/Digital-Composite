import { Carousel, ConfigProvider, Modal } from 'antd'
import { useState } from 'react'
import SingleComposite from './SingleComposite'
import CroppedImage from 'components/CroppedImage/CroppedImage'

type CompositeCarouselProps = {
  composites: {
    src: string
    originalImageWidth?: number
    originalImageHeight?: number
    students: {
      name: string
      x1: number
      y1: number
      x2: number
      y2: number
    }[]
  }[]
}

const CompositeCarousel = ({ composites }: CompositeCarouselProps) => {
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

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              // contentBg: 'transparent'
            }
          }
        }}
      >
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
      </ConfigProvider>
      <Carousel
        autoplay
        infinite
        autoplaySpeed={10000}
        easing="ease-in"
        speed={1500}
      >
        <SingleComposite
          src="/composites/test.jpg"
          originalImageWidth={3667}
          originalImageHeight={2713}
          onStudentClick={onStudentClick}
          students={[]}
        />
        {composites.map((composite, index) => (
          <SingleComposite
            key={index}
            src={composite.src}
            originalImageWidth={composite.originalImageWidth}
            originalImageHeight={composite.originalImageHeight}
            students={composite.students}
            onStudentClick={onStudentClick}
          />
        ))}
      </Carousel>
    </>
  )
}

export default CompositeCarousel
