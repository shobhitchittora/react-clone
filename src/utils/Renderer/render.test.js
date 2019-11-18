import { JSDOM } from 'jsdom'
import { render, createDomNode, setInnerText } from './render'
import createElement from '../createElement'

describe('render', function () {

  beforeEach(() => {
    delete global.window
    delete global.document
    const window = (new JSDOM(`<!DOCTYPE html><div id='root'></div>`)).window
    global.window = window
    global.document = window.document
  })
  
  it('createDomNode should create DOM node of type', function () {
    let type = 'div';
    let domNode = createDomNode(type, document)
    expect(domNode.tagName).toBe('DIV')

    type = 'p';
    domNode = createDomNode(type, document)
    expect(domNode.tagName).toBe('P')

    type = 'null';
    domNode = createDomNode(type, document)
    expect(domNode.tagName).toBe('NULL')
  })

  it('setInnerText should set inner text', function () {
    let type = 'p';
    const text = 'some text';
    let domNode = createDomNode(type, document)
    expect(domNode.tagName).toBe('P')

    setInnerText(domNode, text)

    expect(domNode.innerText).toBe(text)

  })

  it('should render a text node', function () {
    const element = createElement('p', {}, 'Hello world!')
    const root = document.querySelector("div")

    const dom = render(root, element)

    expect(dom.children.length).toEqual(1)
    expect(document.querySelectorAll("p").length).toEqual(1)
    expect(dom.firstChild.tagName).toEqual("P")
  })
})