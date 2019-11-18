
/**
 * 
 * @param {string} type 
 * @param {object} props 
 * @param {Node | string | Array} children 
 */
const createElement = function (type, props = {}, ...children) {

  if (children.length === 1) {
    // Handle text nodes
    if (typeof children[0] === 'string') {
      children = children[0]
    }

    if (children[0] === null) {
      children = []
    }
  }

  return {
    type,
    props: {
      ...props,
      children
    }
  }
}

export default createElement