import { cn } from '@udecode/cn'

type TextFieldProps = {
  label: string
  placeholder: string
  errorMessage?: string
  isError?: boolean
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const TextField = ({
  label,
  placeholder,
  errorMessage,
  isError,
  value,
  onChange
}: TextFieldProps) => {
  return (
    <div className="flex flex-col">
      {/* Label */}
      {label && (
        <label className="font-poppins text-sm text-black">{label}</label>
      )}

      {/* Input Field */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full p-[8px_14px] text-sm font-poppins text-[14px] leading[18px]',
          'border rounded-[4px] outline-none focus:ring-2 focus:ring-opacity-30',
          'placeholder-[#495965]/50',
          isError
            ? 'border-[#7A003C] focus:ring-[#7A003C] shadow-[0_0_3px_rgba(122,0,60,0.3)] text-[#7A003C]'
            : 'border-[#DBDBDD] focus:ring-[#DBDBDD] text-black'
        )}
      />

      {/* Error Message */}
      {isError && errorMessage && (
        <span className={cn('text-sm font-poppins mt-1', 'text-[#7A003C]')}>
          {errorMessage}
        </span>
      )}
    </div>
  )
}

export default TextField
