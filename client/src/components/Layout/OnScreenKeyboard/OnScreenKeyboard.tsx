import { cn } from '@udecode/cn'

type OnScreenKeyboardProps = {
  onPress: (keyPressed: string) => void
}

const OnScreenKeyboard = ({ onPress }: OnScreenKeyboardProps) => {
  const renderButton = (
    label: React.ReactNode,
    keyPressed: string,
    additionalClasses: string = ''
  ) => (
    <button
      className={cn([keyStyle, additionalClasses])}
      onClick={() => onPress(keyPressed)}
    >
      {label}
    </button>
  )

  return (
    <div className="grid grid-rows-4">
      <div id="row-1" className="grid grid-cols-16">
        {renderButton('abc123', 'abc123', 'col-span-2 aspect-auto')}
        {renderButton('q', 'q', leftBorderStyle)}
        {renderButton('w', 'w')}
        {renderButton('e', 'e')}
        {renderButton('r', 'r')}
        {renderButton('t', 't')}
        {renderButton('y', 'y')}
        {renderButton('u', 'u')}
        {renderButton('i', 'i')}
        {renderButton('o', 'o')}
        {renderButton('p', 'p')}
        {renderButton('backspace', 'backspace', rightBorderStyle)}
        {renderButton('1', '1')}
        {renderButton('2', '2')}
        {renderButton('3', '3')}
      </div>
      <div id="row-2" className="grid grid-cols-16">
        {renderButton('@?#', '@?#', 'col-span-2 aspect-auto')}
        {renderButton('a', 'a', leftBorderStyle)}
        {renderButton('s', 's')}
        {renderButton('d', 'd')}
        {renderButton('f', 'f')}
        {renderButton('g', 'g')}
        {renderButton('h', 'h')}
        {renderButton('j', 'j')}
        {renderButton('k', 'k')}
        {renderButton('l', 'l')}
        {renderButton(';', ';')}
        {renderButton("'", "'", rightBorderStyle)}
        {renderButton('4', '4')}
        {renderButton('5', '5')}
        {renderButton('6', '6')}
      </div>
      <div id="row-3" className="grid grid-cols-16">
        <div className={cn([keyStyle, 'col-span-2 aspect-auto'])} />
        {renderButton('shift', 'shift', leftBorderStyle)}
        {renderButton('z', 'z')}
        {renderButton('x', 'x')}
        {renderButton('c', 'c')}
        {renderButton('v', 'v')}
        {renderButton('b', 'b')}
        {renderButton('n', 'n')}
        {renderButton('m', 'm')}
        {renderButton(',', ',')}
        {renderButton('.', '.')}
        {renderButton('/', '/', rightBorderStyle)}
        {renderButton('7', '7')}
        {renderButton('8', '8')}
        {renderButton('9', '9')}
      </div>
      <div id="row-4" className="grid grid-cols-16">
        {renderButton('return', 'return', 'col-span-2 aspect-auto')}
        {renderButton('left', 'left', leftBorderStyle)}
        {renderButton('right', 'right')}
        <div className={keyStyle} />
        {renderButton('space', 'space', 'col-span-5 aspect-auto')}
        <div className={keyStyle} />
        {renderButton(
          'search',
          'search',
          `${rightBorderStyle} col-span-2 aspect-auto`
        )}
        <div className={keyStyle} />
        {renderButton('0', '0')}
        <div className={keyStyle} />
      </div>
    </div>
  )
}

const keyStyle =
  'aspect-square flex items-center justify-center active:bg-gray-100 rounded-[4px]'

const leftBorderStyle = 'border-l-[1px] border-black rounded-l-none'
const rightBorderStyle = 'border-r-[1px] border-black rounded-r-none'

export default OnScreenKeyboard
