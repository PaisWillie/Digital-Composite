import { cn } from '@udecode/cn'

type OnScreenKeyboardProps = {
  onPress: (key: string) => void
}

const OnScreenKeyboard = ({ onPress }: OnScreenKeyboardProps) => {
  return (
    <div className="grid grid-rows-4">
      <div id="row-1" className="grid-cols-16 grid">
        <button className={cn([keyStyle, 'col-span-2 aspect-auto'])}>
          abc123
        </button>
        <button className={cn([keyStyle, leftBorderStyle])}>q</button>
        <button className={keyStyle}>w</button>
        <button className={keyStyle}>e</button>
        <button className={keyStyle}>r</button>
        <button className={keyStyle}>t</button>
        <button className={keyStyle}>y</button>
        <button className={keyStyle}>u</button>
        <button className={keyStyle}>i</button>
        <button className={keyStyle}>o</button>
        <button className={keyStyle}>p</button>
        <button className={cn([keyStyle, rightBorderStyle])}>backspace</button>
        <button className={keyStyle}>1</button>
        <button className={keyStyle}>2</button>
        <button className={keyStyle}>3</button>
      </div>
      <div id="row-2" className="grid-cols-16 grid">
        <button className={cn([keyStyle, 'col-span-2 aspect-auto'])}>
          @?#
        </button>
        <button className={cn([keyStyle, leftBorderStyle])}>a</button>
        <button className={keyStyle}>s</button>
        <button className={keyStyle}>d</button>
        <button className={keyStyle}>f</button>
        <button className={keyStyle}>g</button>
        <button className={keyStyle}>h</button>
        <button className={keyStyle}>j</button>
        <button className={keyStyle}>k</button>
        <button className={keyStyle}>l</button>
        <button className={keyStyle}>;</button>
        <button className={cn([keyStyle, rightBorderStyle])}>&apos;</button>
        <button className={keyStyle}>4</button>
        <button className={keyStyle}>5</button>
        <button className={keyStyle}>6</button>
      </div>
      <div id="row-3" className="grid-cols-16 grid">
        <div className={cn([keyStyle, 'col-span-2 aspect-auto'])} />
        <button className={cn([keyStyle, leftBorderStyle])}>shift</button>
        <button className={keyStyle}>z</button>
        <button className={keyStyle}>x</button>
        <button className={keyStyle}>c</button>
        <button className={keyStyle}>v</button>
        <button className={keyStyle}>b</button>
        <button className={keyStyle}>n</button>
        <button className={keyStyle}>m</button>
        <button className={keyStyle}>,</button>
        <button className={keyStyle}>.</button>
        <button className={cn([keyStyle, rightBorderStyle])}>/</button>
        <button className={keyStyle}>7</button>
        <button className={keyStyle}>8</button>
        <button className={keyStyle}>9</button>
      </div>
      <div id="row-4" className="grid-cols-16 grid">
        <button className={cn([keyStyle, 'col-span-2 aspect-auto'])}>
          return
        </button>
        <button className={cn([keyStyle, leftBorderStyle])}>left</button>
        <button className={keyStyle}>right</button>
        <div className={keyStyle} />
        <button className={cn([keyStyle, 'col-span-5 aspect-auto'])}>
          space
        </button>
        <div className={keyStyle} />
        <button
          className={cn([keyStyle, rightBorderStyle, 'col-span-2 aspect-auto'])}
        >
          search
        </button>
        <div className={keyStyle} />
        <button className={keyStyle}>0</button>
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
