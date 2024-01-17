import { type RenderResult, customRender } from '../../test-config'
import LoadingComponent, { type Props } from './'

beforeEach(() => {
    // Clear the mock state before each test
    jest.clearAllMocks()
})

const text = 'Fetching Product'
const defaultProps: Props = {
    text,
}

const getComponent = (props: Props): RenderResult => {
    return customRender(<LoadingComponent {...props} />)
}
describe('[LOADING COMPONENT]', () => {
    it('Should render component Correctly', () => {
        getComponent(defaultProps)
    })
    it('should render spinner', () => {
        const { getByTestId } = getComponent(defaultProps)
        const component = getByTestId('loading-spinner')
        expect(component).toBeInTheDocument()
    })
    it('should display text content', () => {
        const { getByText } = getComponent(defaultProps)
        const component = getByText(text)
        expect(component).toBeInTheDocument()
    })
})
