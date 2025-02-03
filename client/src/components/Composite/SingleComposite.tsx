import { useEffect, useState } from 'react'

type SingleCompositeProps = {
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
  onStudentClick: (
    src: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ) => void
}

const SingleComposite = ({
  src,
  originalImageWidth,
  originalImageHeight,
  students,
  onStudentClick
}: SingleCompositeProps) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [scale, setScale] = useState<number>(1) // Scale of rendered image compared to original image

  useEffect(() => {
    if (dimensions.width > 0) {
      if (!originalImageWidth && !originalImageHeight) {
        throw new Error(
          'Either originalImageWidth or originalImageHeight must be provided.'
        )
      }
      setScale(
        dimensions.width / (originalImageWidth ?? originalImageHeight ?? 1)
      )
    }
  }, [dimensions, originalImageWidth, originalImageHeight])

  return (
    <div>
      <img
        src={src}
        useMap="#workmap"
        className="object-contain"
        onLoad={(e) => {
          const img = e.target as HTMLImageElement
          return setDimensions({
            width: img.clientWidth,
            height: img.clientHeight
          })
        }}
      />
      <map name="workmap">
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
            href="#"
          />
        ))}
      </map>
    </div>
  )
}

export default SingleComposite
