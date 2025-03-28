import { render, screen, fireEvent, act } from '@testing-library/react'
import Calculator from '../index'
import '@testing-library/jest-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'

describe('TDEE Calculator Component', () => {
  const mockSetBmrResult = jest.fn()
  const mockSetShouldShowTdee = jest.fn()

  beforeEach(() => {
    mockSetBmrResult.mockClear()
    mockSetShouldShowTdee.mockClear()
  })
  const renderCalculator = ( props = {} ) => {
    return render(
      <ChakraProvider value={defaultSystem}>
        <Calculator bmrResult="" setBmrResult={mockSetBmrResult} setShouldShowTdee={mockSetShouldShowTdee} {...props} />
      </ChakraProvider>
    )
  }

  test('應該能正確渲染所有輸入字串', () => {
    renderCalculator()

    expect(screen.getByText('Gender')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Weight(kg)')).toBeInTheDocument()
    expect(screen.getByText('Height(cm)')).toBeInTheDocument()
  })
  test('應該能正確選擇性別',async () => {
    renderCalculator()
    const maleRadio = screen.getByRole('radio', { name: 'Male'})
    const femaleRadio = screen.getByRole('radio', { name: 'Female'})
    await act(async() => fireEvent.click(maleRadio))
    expect(maleRadio).toBeChecked()
    await act(async() => fireEvent.click(femaleRadio))
    expect(femaleRadio).toBeChecked()
  })
  test('年齡輸入框只接受輸入數字', () => {
    renderCalculator()
    const ageInput = screen.getByLabelText('Age') as HTMLInputElement
    fireEvent.change(ageInput, {target: {value: '25'}})
    expect(ageInput.value).toBe('25')
    fireEvent.change(ageInput, {target: {value: 'abc'}})
    expect(ageInput.value).toBe('25')
  })
  test('體重輸入只接受數字和最多兩位小數', () => {
    renderCalculator()
    const weightInput = screen.getByLabelText('Weight(kg)') as HTMLInputElement
    fireEvent.change(weightInput, {target: 
    {value: '65.5'}})
    expect(weightInput.value).toBe('65.5')
    fireEvent.change(weightInput, {target: {value: '65.55'}})
    expect(weightInput.value).toBe('65.55')
    fireEvent.change(weightInput, {target: {value: '65.555'}})
    expect(weightInput.value).toBe('65.55')
  })
  test('身高輸入只接受數字和最多兩位小數', () => {
    renderCalculator()
    const weightInput = screen.getByLabelText('Height(cm)') as HTMLInputElement
    fireEvent.change(weightInput, {target: 
    {value: '171.5'}})
    expect(weightInput.value).toBe('171.5')
    fireEvent.change(weightInput, {target: {value: '171.55'}})
    expect(weightInput.value).toBe('171.55')
    fireEvent.change(weightInput, {target: {value: '171.555'}})
    expect(weightInput.value).toBe('171.55')
  })
  test('當輸入值為0時應顯示錯誤訊息', () => {
    renderCalculator()
    const weightInput = screen.getByLabelText('Weight(kg)')
    fireEvent.change(weightInput, { target: {value: '0'}})
    const element = screen.getByText('The input must be a number greater than 0.')
    expect(element).toBeInTheDocument()
  })
  test('應正確計算男性BMR', async () => {
    renderCalculator()
    const maleRadio = screen.getByText('Male')
    

    const ageInput = screen.getByLabelText('Age')
    const weightInput = screen.getByLabelText
    ('Weight(kg)')
    const heightInput = screen.getByLabelText('Height(cm)')
    await act(async () => {
      fireEvent.click(maleRadio)
      fireEvent.change(ageInput, { target: { value: '25' }})
      fireEvent.change(weightInput, { target: { value: '65'}})
      fireEvent.change(heightInput, { target: { value: '175'}})
    })


    const expectedBmr = (13.7 * 65 + 5 * 175 - 6.8 * 25 + 66).toFixed(0)
    // 驗證
    expect(mockSetBmrResult).toHaveBeenLastCalledWith(expectedBmr)
  })

  test('應正確計算女性BMR', async () => {
    renderCalculator()
    const femaleRadio = screen.getByText('Female')
    

    const ageInput = screen.getByLabelText('Age')
    const weightInput = screen.getByLabelText
    ('Weight(kg)')
    const heightInput = screen.getByLabelText('Height(cm)')
    await act(async () => {
      fireEvent.click(femaleRadio)
      fireEvent.change(ageInput, { target: { value: '25' }})
      fireEvent.change(weightInput, { target: { value: '55'}})
      fireEvent.change(heightInput, { target: { value: '165'}})
    })


    const expectedBmr = (9.6 * 55 + 1.8 * 165 - 4.7 * 25 + 655).toFixed(0)
    // 驗證
    expect(mockSetBmrResult).toHaveBeenLastCalledWith(expectedBmr)
  })

  test('當BMR為0時不應顯示結果', async () => {
    const setBmrResult = jest.fn()
    const setShouldShowTdee = jest.fn()
    
    await act(async () => {
      render(
        <Calculator
          bmrResult="0"
          setBmrResult={setBmrResult}
          setShouldShowTdee={setShouldShowTdee}
        />
      )
    })

    const bmrResultContainer = screen.getByText('BMR Result:').parentElement?.querySelector('.bg-white')
    expect(bmrResultContainer).toHaveTextContent('')
  })

  test('當任一輸入值為0時不應顯示BMR結果', async () => {
    const setBmrResult = jest.fn()
    const setShouldShowTdee = jest.fn()
    
    await act(async () => {
      render(
        <Calculator
          bmrResult="1500"
          setBmrResult={setBmrResult}
          setShouldShowTdee={setShouldShowTdee}
        />
      )
      
      // 設置體重為0
      const weightInput = screen.getByLabelText(/Weight\(kg\)/) as HTMLInputElement
      fireEvent.change(weightInput, { target: { value: '0' } })
      
      // 設置其他有效值
      const heightInput = screen.getByLabelText(/Height\(cm\)/) as HTMLInputElement
      const ageInput = screen.getByLabelText(/Age/) as HTMLInputElement
      
      fireEvent.change(heightInput, { target: { value: '170' } })
      fireEvent.change(ageInput, { target: { value: '25' } })
    })

    const bmrResultContainer = screen.getByText('BMR Result:').parentElement?.querySelector('.bg-white')
    expect(bmrResultContainer).toHaveTextContent('')
    expect(setShouldShowTdee).toHaveBeenCalledWith(false)
  })
})
