import { cn } from '@udecode/cn'

type TextFieldWithButtonProps = {
  label?: string
  textFieldPlaceholder: string
  errorMessage?: string
  isError?: boolean
  textFieldValue: string
  onTextFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  buttonLabel: React.ReactNode
  onButtonClick: () => void
}

const TextFieldWithButton = ({
  label,
  textFieldPlaceholder: placeholder,
  errorMessage,
  isError,
  textFieldValue: value,
  onTextFieldChange,
  buttonLabel,
  onButtonClick
}: TextFieldWithButtonProps) => {
  return (
    <div className="flex flex-col">
      {/* Label */}
      {label && (
        <label className="font-poppins text-sm text-black">{label}</label>
      )}

      {/* Input Field */}
      <div className={cn(['flex flex-row'])}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onTextFieldChange}
          className={cn(
            'w-full p-[8px_14px] text-sm font-poppins text-[14px] leading[18px]',
            'border rounded-l-[4px] outline-none focus:ring-2 focus:ring-opacity-30',
            'placeholder-[#495965]/50',
            isError
              ? 'border-[#7A003C] focus:ring-[#7A003C] shadow-[0_0_3px_rgba(122,0,60,0.3)] text-[#7A003C]'
              : 'border-[#DBDBDD] focus:ring-[#DBDBDD] text-black'
          )}
        />
        <button
          onClick={onButtonClick}
          className={cn([
            'font-poppins rounded-r-[4px] font-semibold px-[18px] text-[14px] leading-[24px]',
            'bg-[#7A003C] text-white hover:bg-[#FDBF57] hover:text-black active:text-black active:bg-[#FDBF57] active:shadow-[0_0_3px_rgba(122,0,60,0.3)]'
          ])}
        >
          {buttonLabel}
        </button>
      </div>

      {/* Error Message */}
      {isError && errorMessage && (
        <span className={cn('text-sm font-poppins mt-1', 'text-[#7A003C]')}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default TextFieldWithButton
