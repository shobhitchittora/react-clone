import React from './react'

describe('React public API test', function () {

  const PUBLIC_API = {
    'createElement': 'function',
    'render': 'function'
  }

  it('should have the public API methods', function () {

    Object.keys(PUBLIC_API).forEach((method) => {
      expect(React.hasOwnProperty(method)).toBe(true)
      expect(typeof React[method]).toBe(PUBLIC_API[method])
    });
    
  })
})
