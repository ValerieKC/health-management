import { Button } from '@chakra-ui/react'
import { ButtonHTMLAttributes } from 'react'

interface HMButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: 'primary' | 'outline' 
  width?: string
  disabled?: boolean
  children?: React.ReactNode
  className?: string
  isLoading?: boolean
}
const HMButton = ({
  theme = 'primary',
  disabled = false,
  width,
  children,
  className,
  isLoading,
  ...props
}: HMButtonProps) => {
  const baseStyle = `flex items-center justify-center font-medium rounded-lg h-[34px] text-2 gap-[10px] ${children ? 'py-[5px] px-[15px]' : 'p-[17px]'}`
  const colorsMap = {
    primary: {
      default: 'bg-primary-400 text-white',
      hover: 'hover:bg-primary-500',
      disabled: 'disabled:bg-primary-600 disabled:text-neutral-40',
    },
    outline: {
      default: 'text-primary-400 border border-primary-400 border-solid border-[2px] bg-none',
      hover: 'hover:bg-primary-500 hover:text-white hover:border-primary-500',
      disabled: 'disabled:border-primary-600 disabled:text-primary-600',
    },
  }

  const themeClasses = colorsMap[theme] || colorsMap['primary']
  const disabledClass = disabled ? themeClasses.disabled : ''
  const hoverClass = !disabled ? themeClasses.hover : ''
  const widthClass = width ? `w-[${width || ''}]` : ''

  const classes =
    `${baseStyle} ${themeClasses.default} ${hoverClass} ${disabledClass} ${widthClass} ${className || ''}`.trim()

  return (<Button className={classes} disabled={disabled} {...props} loading={isLoading}>
    {children}
  </Button>)
}
export default HMButton