import { cn } from '@udecode/cn'

interface CroppedImageProps {
  src: string
  x1: number
  y1: number
  x2: number
  y2: number
}

const CroppedImage = ({ src, x1, y1, x2, y2 }: CroppedImageProps) => {
  const width = x2 - x1
  const height = y2 - y1

  return (
    <div
      className={cn(['relative overflow-hidden', height > 650 && 'scale-50'])}
      style={{ width, height }}
    >
      <img
        src={src}
        className="absolute size-auto max-h-none max-w-none"
        style={{
          left: -x1,
          top: -y1
        }}
      />
    </div>
  )
}

export default CroppedImage
