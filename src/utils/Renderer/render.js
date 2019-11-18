const createDomNode = function (type, document = window.document) {
  return document.createElement(type)
}

const setInnerText = function (domNode, text) {
  domNode.innerText = text
  return domNode
}

/**
 * 
 * @param {DomNode} root 
 * @param {ReactElement} element 
 */
const render = function (root, element) {

  if (!root || !(root instanceof window.HTMLElement)) {
    return null
  }

  if (!element) {
    return root
  }

  let domElement = createDomNode(element.type)
  setInnerText(domElement, element.props.children)
  
  root.appendChild(domElement)
  
  return root;
}

export { render, createDomNode, setInnerText }