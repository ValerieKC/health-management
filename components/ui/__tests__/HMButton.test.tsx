import HMButton from '../HMButton'
import { fireEvent, render, screen } from '@testing-library/react'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
const renderButton = (props={}) => {
  return render (
    <ChakraProvider  value={defaultSystem}>
      <HMButton {...props} />
    </ChakraProvider>
  )
}
describe('HMButton', () => {
  test('應該能夠正確渲染按鈕及內容', () => {
    renderButton({ theme:'primary',children: 'click me' })
    expect(screen.getByText('click me')).toBeInTheDocument()
  })

  test('應該能夠依據theme屬性變更樣式', () => {
    renderButton({ theme: 'primary', children: 'Primary' })
    const primaryButton = screen.getByText('Primary')
    expect(primaryButton).toHaveClass('bg-primary-400')

    renderButton({ theme: 'outline', children: 'Outline' })
    const outlineButton = screen.getByText('Outline')
    expect(outlineButton).toHaveClass('text-primary-400')
  })

  test('應該能夠套用Disabled屬性並disabled按鈕', () => {
    const handleClick = jest.fn()
    renderButton({ theme: 'primary', children: 'Disabled Button', disabled: true, onClick: handleClick })
    const button = screen.getByText('Disabled Button')  
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:bg-primary-600 disabled:text-neutral-40')

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  test('應該能夠正確處理點擊事件', () => {
    const handleClick=jest.fn()
    renderButton({theme: 'primary', children: 'Clickable Button', onClick: handleClick})
    const button = screen.getByText('Clickable Button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

})
