import { cn } from '@udecode/cn'
import { useState } from 'react'
import { FaArrowUp, FaDeleteLeft } from 'react-icons/fa6'
import { RiSpace } from 'react-icons/ri'

type OnScreenKeyboardProps = {
  onPress: (keyPressed: string) => void
}

const OnScreenKeyboard = ({ onPress }: OnScreenKeyboardProps) => {
  const [isShiftActive, setIsShiftActive] = useState(false)

  const handleKeyPress = (keyPressed: string) => {
    if (keyPressed === 'shift') {
      setIsShiftActive(!isShiftActive)
    } else {
      onPress(keyPressed)

      // if shift is active, deactivate it after pressing a key
      if (isShiftActive) {
        setIsShiftActive(false)
      }
    }
  }

  const getShiftedCharacter = (character: string) => {
    if (isShiftActive) {
      return character.toUpperCase()
    } else {
      return character
    }
  }

  const renderButton = (
    label: React.ReactNode,
    keyPressed: string,
    additionalClasses: string = ''
  ) => (
    <button
      className={cn([keyStyle, additionalClasses])}
      onClick={() => handleKeyPress(keyPressed)}
    >
      {label}
    </button>
  )

  return (
    <div className="grid grid-rows-4">
      <div id="row-1" className="grid grid-cols-16">
        {/* {renderButton('abc123', 'abc123', 'col-span-2 aspect-auto')} */}
        <div className="col-span-2" />
        {renderButton(getShiftedCharacter('q'), getShiftedCharacter('q'))}
        {renderButton(getShiftedCharacter('w'), getShiftedCharacter('w'))}
        {renderButton(getShiftedCharacter('e'), getShiftedCharacter('e'))}
        {renderButton(getShiftedCharacter('r'), getShiftedCharacter('r'))}
        {renderButton(getShiftedCharacter('t'), getShiftedCharacter('t'))}
        {renderButton(getShiftedCharacter('y'), getShiftedCharacter('y'))}
        {renderButton(getShiftedCharacter('u'), getShiftedCharacter('u'))}
        {renderButton(getShiftedCharacter('i'), getShiftedCharacter('i'))}
        {renderButton(getShiftedCharacter('o'), getShiftedCharacter('o'))}
        {renderButton(getShiftedCharacter('p'), getShiftedCharacter('p'))}
        {renderButton(<FaDeleteLeft />, 'backspace', rightBorderStyle)}
        {renderButton('1', '1')}
        {renderButton('2', '2')}
        {renderButton('3', '3')}
      </div>
      <div id="row-2" className="grid grid-cols-16">
        {/* {renderButton('@?#', '@?#', 'col-span-2 aspect-auto')} */}
        <div className="col-span-2" />
        {renderButton(getShiftedCharacter('a'), getShiftedCharacter('a'))}
        {renderButton(getShiftedCharacter('s'), getShiftedCharacter('s'))}
        {renderButton(getShiftedCharacter('d'), getShiftedCharacter('d'))}
        {renderButton(getShiftedCharacter('f'), getShiftedCharacter('f'))}
        {renderButton(getShiftedCharacter('g'), getShiftedCharacter('g'))}
        {renderButton(getShiftedCharacter('h'), getShiftedCharacter('h'))}
        {renderButton(getShiftedCharacter('j'), getShiftedCharacter('j'))}
        {renderButton(getShiftedCharacter('k'), getShiftedCharacter('k'))}
        {renderButton(getShiftedCharacter('l'), getShiftedCharacter('l'))}
        {renderButton(';', ';')}
        {renderButton("'", "'", rightBorderStyle)}
        {renderButton('4', '4')}
        {renderButton('5', '5')}
        {renderButton('6', '6')}
      </div>
      <div id="row-3" className="grid grid-cols-16">
        <div className={cn([keyStyle, 'col-span-2 aspect-auto'])} />
        {renderButton(<FaArrowUp />, 'shift')}
        {renderButton(getShiftedCharacter('z'), getShiftedCharacter('z'))}
        {renderButton(getShiftedCharacter('x'), getShiftedCharacter('x'))}
        {renderButton(getShiftedCharacter('c'), getShiftedCharacter('c'))}
        {renderButton(getShiftedCharacter('v'), getShiftedCharacter('v'))}
        {renderButton(getShiftedCharacter('b'), getShiftedCharacter('b'))}
        {renderButton(getShiftedCharacter('n'), getShiftedCharacter('n'))}
        {renderButton(getShiftedCharacter('m'), getShiftedCharacter('m'))}
        {renderButton(',', ',')}
        {renderButton('.', '.')}
        {renderButton('/', '/', rightBorderStyle)}
        {renderButton('7', '7')}
        {renderButton('8', '8')}
        {renderButton('9', '9')}
      </div>
      <div id="row-4" className="grid grid-cols-16">
        <div className="col-span-2" />
        {/* {renderButton('Return', 'return', 'col-span-2 aspect-auto')} */}
        {renderButton('Return', 'return', `col-span-2 aspect-auto`)}
        {/* {renderButton(<FaAngleLeft />, 'left', leftBorderStyle)}
        {renderButton(<FaAngleRight />, 'right')} */}
        <div />
        {renderButton(
          <RiSpace />,
          'space',
          'col-span-5 aspect-auto border-b-[1px]'
        )}
        <div />
        {renderButton(
          'Search',
          'search',
          `${rightBorderStyle} col-span-2 aspect-auto`
        )}
        <div />
        {renderButton('0', '0')}
        <div />
      </div>
    </div>
  )
}

const keyStyle =
  'aspect-square flex items-center justify-center active:bg-gray-100 rounded-[4px]'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const leftBorderStyle = 'border-l-[1px] border-black rounded-l-none'
const rightBorderStyle = 'border-r-[1px] border-black rounded-r-none'

export default OnScreenKeyboard
