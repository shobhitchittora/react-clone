import createElement from './createElement'

describe('createElement', function () {

  it('should return the React createElement object', function () {
    const type = 'p'
    const props = {
      className: 'p-tag-class',
      id: 'p-tag-id',
    }
    const children = 'Hello world!'

    const element = createElement(type, props, children)

    expect(element.type).toEqual(type)
    expect(element.props).toEqual(expect.objectContaining({ ...props }))
    expect(element.props).toEqual(expect.objectContaining({ children }))

  })

  it('should render empty div elemeent', function () {
    const type = 'div'
    const props = {}
    const children = null

    const element = createElement(type, props, children)

    expect(element.type).toEqual(type)
    expect(element.props.children).toEqual([])
  })

  it('should render div elemeent with p tag and a tag as child', function () {
    const type = 'div'
    const props = {}
    const children = [createElement('p'), createElement('a')]

    const element = createElement(type, props, ...children)

    expect(element.type).toEqual(type)
    expect(element.props.children.length).toBe(2)
  })
})