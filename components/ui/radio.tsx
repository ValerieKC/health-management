import { RadioGroup as ChakraRadioGroup } from '@chakra-ui/react'
import * as React from 'react'

export interface RadioProps extends ChakraRadioGroup.ItemProps {
  rootRef?: React.Ref<HTMLDivElement>
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  function Radio(props, ref) {
    const { children, inputProps, rootRef, ...rest } = props
    return (
      <ChakraRadioGroup.Item ref={rootRef} {...rest}>
        <ChakraRadioGroup.ItemHiddenInput ref={ref} {...inputProps} />
        <ChakraRadioGroup.ItemIndicator 
          className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-300"
        >
          <div className="h-2 w-2 rounded-full bg-primary" />
        </ChakraRadioGroup.ItemIndicator>
        {children && (
          <ChakraRadioGroup.ItemText>{children}</ChakraRadioGroup.ItemText>
        )}
      </ChakraRadioGroup.Item>
    )
  },
)

export const RadioGroup = ChakraRadioGroup.Root
