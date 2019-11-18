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
    const mountNode = document.querySelector("div")

    const dom = render(mountNode, element)

    expect(dom.children.length).toEqual(1)
    expect(document.querySelectorAll("p").length).toEqual(1)
    expect(dom.firstChild.tagName).toEqual("P")
  })

  it('should convert and add props to child', function () {
    const element = createElement('p', { id: 'p-id', className: 'p-class' }, 'Helloww!')
    const mountNode = document.querySelector("div")

    const dom = render(mountNode, element)

    expect(dom.children.length).toEqual(1)
    expect(dom.firstChild.tagName).toEqual("P")
    expect(dom.firstChild.getAttribute('id')).toEqual("p-id")
    expect(dom.firstChild.getAttribute('class')).toEqual("p-class")
  })

  it('should render multiple child nodes', function () {
    const children = [createElement('p', {}, 'Child1'), createElement('a', {}, 'Child2')]
    const root = createElement('div', { className: 'app' }, ...children)
    const mountNode = document.querySelector("div")

    const dom = render(mountNode, root)

    expect(dom.children.length).toEqual(1)
    expect(dom.firstChild.getAttribute('class')).toEqual('app')
    expect(dom.firstChild.childNodes[0].tagName).toEqual('P')
    expect(dom.firstChild.childNodes[1].tagName).toEqual('A')
  })
})