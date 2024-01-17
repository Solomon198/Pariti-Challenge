import { type RenderResult, customRender, fireEvent } from '../../test-config'
import Button, { type IButton } from './'

beforeEach(() => {
    // Clear the mock state before each test
    jest.clearAllMocks()
})

const mockClick = jest.fn()
const btnText = 'Submit'
const defaultProps: IButton = {
    isLoading: false,
    onClick: mockClick,
}

const getComponent = (props: IButton): RenderResult => {
    return customRender(<Button {...props}>{btnText}</Button>)
}
describe('[BUTTON COMPONENT]', () => {
    it('Should render button Correctly', () => {
        const { getByRole } = getComponent(defaultProps)
        const component = getByRole('button', { name: btnText })
        expect(component).toBeInTheDocument()
    })
    it('should not render spinner', () => {
        const { queryByTestId } = getComponent(defaultProps)
        const component = queryByTestId('loading-spinner')
        expect(component).not.toBeInTheDocument()
    })
    it('should render spinner', () => {
        const { getByTestId } = getComponent({
            ...defaultProps,
            isLoading: true,
        })
        const component = getByTestId('loading-spinner')
        expect(component).toBeInTheDocument()
    })
    it('should be clickable', () => {
        const { getByRole } = getComponent(defaultProps)
        const component = getByRole('button', { name: btnText })
        expect(component).toBeInTheDocument()
        fireEvent.click(component)
        expect(mockClick).toHaveBeenCalledTimes(1)
    })
    it('should not be clickable when disabled', () => {
        const { getByRole } = getComponent({ ...defaultProps, disabled: true })
        const component = getByRole('button', { name: btnText })
        expect(component).toBeInTheDocument()
        fireEvent.click(component)
        expect(mockClick).not.toHaveBeenCalled()
    })
})
