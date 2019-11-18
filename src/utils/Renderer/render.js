const createDomNode = function (type, document = window.document) {
  return document.createElement(type)
}

const setInnerText = function (domNode, text) {
  domNode.innerText = text
  return domNode
}

const propsMap = {
  className: 'class',
  id: 'id'
}

const addProps = function (props, domElement) {
  if (props) {
    const propsArr = Object.keys(props)
    if (propsArr.length) {
      propsArr.forEach(prop => {
        if (prop in propsMap) {
          domElement.setAttribute(propsMap[prop], props[prop])
        }
      })
    }
  }
}

const renderChildren = function (element, children) {
  let domElement = createDomNode(element.type)

  addProps(element.props, domElement)

  if (typeof children === 'string') {
    setInnerText(domElement, children)
  } else {
    children.forEach(child => {
      domElement.appendChild(renderChildren(child, child.props.children))
    });
  }
  return domElement
}

/**
 * 
 * @param {DomNode} mountNode 
 * @param {ReactElement} element 
 */
const render = function (mountNode, element) {

  if (!mountNode || !(mountNode instanceof window.HTMLElement)) {
    return null
  }

  if (!element) {
    return mountNode
  }

  let domElement = null
  if (element.props.children) {
    domElement = renderChildren(element, element.props.children)
  }

  if (domElement) {
    mountNode.appendChild(domElement)
  }

  return mountNode;
}

export { render, createDomNode, setInnerText }