import Layout from '../Layout/Layout'
import { Carousel } from 'antd'
import { FaPlus } from 'react-icons/fa6'
import { useState } from 'react'
import TextButton from 'components/Button/TextButton'

const images = [
  '/composites/B-Teach Engineering Composite 2023 Final.jpg',
  '/composites/B-Tech 2024 Final.jpg',
  '/composites/B-Tech Engineering 2022 Final.jpg',
  '/composites/B-Tech Engineering Class of 2021 FINAL.jpg',
  '/composites/CHEMICAL Engineering Final Composite 2023 Final.jpg',
  '/composites/Chemical Engineering Revised-Final 2024.jpg',
  '/composites/CIVIAL Engineering Final Composite 2023 Final.jpg',
  '/composites/Civil 2024 Revised Final.jpg',
  '/composites/COMPUTER 2024 Final.jpg',
  '/composites/COMPUTER Engineering 2023 FINAL.jpg',
  '/composites/Computer Science 2021 Composite FINAL - Final.jpg',
  '/composites/Computer Science 2024 Final.jpg',
  '/composites/COMPUTER SCIENCE Engineering 2023 FINAL.jpg',
  '/composites/ELECTRICAL 2024 Final.jpg',
  '/composites/ELECTRICAL Engineering Final Composite 2023 FINAL.jpg',
  '/composites/ElectricalEngineering-2024.jpg',
  '/composites/Engineering Class of 2021-Final .jpg',
  '/composites/Engineering Computer Science-2022 Final.jpg',
  '/composites/Engineering Physics 2024 Final.jpg',
  '/composites/IBEHS 2021 Final ( New-First Year).jpg',
  '/composites/IBEHS 2024 Final.jpg',
  '/composites/IBEHS Engineering Final Composite 2023 Final.jpg',
  '/composites/IBEHS-2022 Final.jpg',
  '/composites/Main Composite 2022 Final.jpg',
  '/composites/MATERIALS 2024 Final.jpg',
  '/composites/MATERIALS Engineering Final Composite 2023 FINAL.jpg',
  '/composites/MECHANICAL 2024 FINAL.jpg',
  '/composites/MECHANICAL Engineering Final Composite 203 Final.jpg',
  '/composites/Mechatronics 2024 Final.jpg',
  '/composites/MECHATRONICS Engineering Final Composite 2023 Final.jpg',
  '/composites/PHYSICS Engineering Final Composite 2023 Final.jpg',
  '/composites/SOFTWARE 2024 Final.jpg',
  '/composites/SOFTWARE Engineering Final Composite 2023FINAL.jpg'
]

const SearchResultPage = () => {
  const [selectedCompositeId, setSelectedCompositeId] = useState(-1)

  // TODO: pressing back button will return back to same position in carousel
  // TODO: add (non-white) arrows to Carousel to make it more accessible

  return (
    <Layout>
      <div className="flex flex-col">
        {selectedCompositeId === -1 ? (
          <>
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
            <Carousel
              easing="ease-in"
              speed={1500}
              arrows
              infinite={false}
              slidesPerRow={3}
              rows={3}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setSelectedCompositeId(index)
                  }}
                  className="flex flex-col items-center gap-y-2"
                >
                  <img key={index} src={image} />
                  <p>Program, Year, {index}</p>
                </div>
              ))}
            </Carousel>
          </>
        ) : (
          <>
            <div
              onClick={() => {
                setSelectedCompositeId(-1)
              }}
            >
              Back
            </div>
            {/* WIP: Zoom into Carousel */}
            {/* <Carousel infinite easing="ease-in" speed={1500}>
              {[
                ...images.slice(selectedCompositeId),
                ...images.slice(0, selectedCompositeId)
              ].map((image, index) => (
                <div key={index}>
                  <p>selectedCompositeId: {selectedCompositeId}</p>
                  <img
                    src={image}
                    useMap="#workmap"
                    className="max-h-[95vh] object-contain"
                  />
                </div>
              ))}
            </Carousel> */}
            <img
              src={images[selectedCompositeId]}
              useMap="#workmap"
              className="max-h-[95vh] object-contain"
            />
          </>
        )}
      </div>
    </Layout>
  )
}

export default SearchResultPage
