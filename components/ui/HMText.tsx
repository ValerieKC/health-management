import { HTMLAttributes, ReactNode } from 'react'
const textSizeClasses: Record<string | number, string> = {
  1: 'text-size-1',
  2: 'text-size-2',
  3: 'text-size-3',
  4: 'text-size-4',
  5: 'text-size-5',
  6: 'text-size-6',
  7: 'text-size-7',
  8: 'text-size-8',
}

const fontWeightClasses: Record<string | number, string> = {
  100: 'font-thin',
  200: 'font-extralight',
  300: 'font-light',
  400: 'font-normal',
  500: 'font-medium',
  600: 'font-semibold',
  700: 'font-bold',
}
interface SQTextProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  level?: string | number
  color?: string
  pointer?: boolean
  className?: string
  fontWeight?: number | string
}
/**
 * @param level -
 * - level 1 - 12px
 * - level 2 - 14px
 * - level 3 - 16px
 * - level 4 - 20px
 * - level 5 - 24px
 * - level 6 - 28px
 * - level 7 - 32px
 * - level 8 - 40px
 * @param fontWeight
 * default - 400
 */
const HMText = ({
  level = 4,
  color,
  className,
  fontWeight = '400',
  children,
  ...props
}: SQTextProps) => {
  const textClass = textSizeClasses[level] || ''
  const colorClass = color || 'text-neutral-5'
  const fontWeightClass = fontWeightClasses[fontWeight] || ''

  const classes =
    ` ${textClass} ${colorClass} ${fontWeightClass} ${className || ''}`.trim()
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  )
}
export default HMText