import { StudentCoordinate } from 'components/App'
import { createRef, useEffect, useState } from 'react'

type SingleCompositeProps = {
  index: number
  src: string
  students: StudentCoordinate[]
  onStudentClick: (
    src: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => void
}

const SingleComposite = ({
  index,
  src,
  students,
  onStudentClick
}: SingleCompositeProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState(1) // Scale of rendered image compared to original image
  const imgRef = createRef<HTMLImageElement>()

  useEffect(() => {
    console.log('Running!')
    if (imgRef.current && dimensions.width > 0 && dimensions.height > 0) {
      const displayedWidth = imgRef.current.clientWidth
      setScale(displayedWidth / dimensions.width)
    }
  }, [dimensions, imgRef])

  return (
    <div>
      <img
        ref={imgRef}
        src={src}
        useMap={`#${index}-map`}
        className="object-contain"
        onLoad={(e) => {
          const originalImg = e.currentTarget as HTMLImageElement
          return setDimensions({
            width: originalImg.naturalWidth,
            height: originalImg.naturalHeight
          })
        }}
      />
      <map name={`${index}-map`}>
        {students.map((student, index) => (
          <area
            key={index}
            shape="rect"
            coords={
              student.x1 * scale +
              ',' +
              student.y1 * scale +
              ',' +
              student.x2 * scale +
              ',' +
              student.y2 * scale
            }
            onClick={() => {
              onStudentClick(
                src,
                student.x1,
                student.y1,
                student.x2,
                student.y2
              )
            }}
          />
        ))}
      </map>
    </div>
  )
}

export default SingleComposite
