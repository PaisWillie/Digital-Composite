import { cn } from '@udecode/cn'

type ButtonProps = {
  onClick?: () => void
  href?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  children?: React.ReactNode
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  disabled?: boolean
  isMobile?: boolean
}

const TextButton = ({
  onClick,
  href,
  variant = 'primary',
  children,
  leadingIcon,
  trailingIcon,
  disabled = false,
  isMobile = false
}: ButtonProps) => {
  return (
    <a href={href}>
      <button
        onClick={onClick}
        className={cn([
          'font-poppins rounded-[4px] font-semibold   flex flex-row items-center',
          isMobile
            ? 'text-[14px] leading-[18px] px-[16px] py-[8px]'
            : 'text-[20px] leading-[24px] px-[24px] py-[12px]',
          variant === 'primary' &&
            (disabled
              ? 'bg-[#DBDBDD] text-[#4F595F]/50 cursor-not-allowed'
              : 'bg-[#7A003C] text-white hover:bg-[#FDBF57] hover:text-black active:text-black active:bg-[#FDBF57] active:shadow-[0_0_3px_rgba(122,0,60,0.3)]'),
          variant === 'secondary' &&
            (disabled
              ? 'bg-[#DBDBDD] text-[#4F595F]/50 cursor-not-allowed border-[2px] border-[#4F595F]/50'
              : 'bg-white text-[#7A003C] border-[2px] border-[#7A003C] hover:bg-[#7A003C] hover:text-white active:text-white active:bg-[#7A003C] active:shadow-[0_0_3px_rgba(122,0,60,0.3)]'),
          variant === 'tertiary' &&
            (disabled
              ? 'text-[#DBDBDD]/50 cursor-not-allowed' // TODO: Change icon color according to branding guidelines
              : 'text-black hover:text-[#7A003C] active:text-[#7A003C]') // TODO: Change icon color according to branding guidelines
        ])}
        disabled={disabled}
      >
        {leadingIcon && <span className="mr-[8px]">{leadingIcon}</span>}
        {children}
        {trailingIcon && <span className="ml-[8px]">{trailingIcon}</span>}
      </button>
    </a>
  )
}

export default TextButton
