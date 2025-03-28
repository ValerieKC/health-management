import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, screen } from '@testing-library/react'
import HMText from '../HMText'

const renderHMText = ( props = {} ) => {
  return render (
    <ChakraProvider value={defaultSystem}>
      <HMText {...props} />
    </ChakraProvider>
  )
}
describe('HMText', () => {
  test('應該能夠正確渲染文字內容', () => {
    renderHMText({children: '測試文字'})
    const element = screen.getByText('測試文字')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('text-size-4','text-neutral-5','font-normal')
  })
  //測試字體大小
  test.each([[1,'text-size-1'],[4, 'text-size-4'],[8,'text-size-8']])('renders with correct text size level %i',(level, expectedClass) => {
    renderHMText({children:'測試文字', level:level})
    const element = screen.getByText('測試文字')
    expect(element).toHaveClass(expectedClass)
  })

  //測試字重
  test.each([[100,'font-thin'],[400,'font-normal'],[700, 'font-bold']])('該能夠顯示不同字重 %i', (weight, expectedClass)=>{
    renderHMText({fontWeight: weight, children:'測試文字'})
    const element = screen.getByText('測試文字')
    expect(element).toHaveClass(expectedClass)
  })

  //測試子元素渲染
  test('應可以渲染HMText的子元素', () => {
    renderHMText({children:<><span>子元素1</span><span>子元素2</span></>})
    const element1 = screen.getByText('子元素1')
    const element2 = screen.getByText('子元素2')
    expect(element1).toBeInTheDocument()
    expect(element2).toBeInTheDocument()
  })
})