import { Carousel, Modal } from 'antd'
import { StudentCoordinate } from 'components/App'
import CroppedImage from 'components/CroppedImage/CroppedImage'
import { useState } from 'react'
import SingleComposite from './SingleComposite'

type CompositeCarouselProps = {
  composites: {
    src: string
    students: StudentCoordinate[]
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

  return (
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
      <Carousel
        autoplay
        infinite
        autoplaySpeed={10000}
        easing="ease-in"
        speed={1500}
      >
        {/* <SingleComposite
          src="/composites/test.jpg"
          // originalImageWidth={3667}
          // originalImageHeight={2713}
          onStudentClick={onStudentClick}
          students={[]}
        /> */}
        {composites.map((composite, index) => (
          <SingleComposite
            index={index}
            key={index}
            src={composite.src}
            students={composite.students}
            onStudentClick={onStudentClick}
          />
        ))}
      </Carousel>
    </>
  )
}

export default CompositeCarousel
