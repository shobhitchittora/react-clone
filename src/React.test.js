import vm from 'vm'
import { JSDOM } from 'jsdom'
import { transformAsync } from '@babel/core'
import React from './react'

describe('React public API test', function () {

  const PUBLIC_API = {
    'createElement': 'function',
    'render': 'function'
  }

  xit('should have the public API methods', function () {

    Object.keys(PUBLIC_API).forEach((method) => {
      expect(React.hasOwnProperty(method)).toBe(true)
      expect(typeof React[method]).toBe(PUBLIC_API[method])
    });
  })

  it('should render JSX to dom tree', async function () {
    const appCode = `
      const App = 
      <div className="app">
        <img src="avatar.png" className="profile" />
        <h3>{[user.firstName, user.lastName].join(' ')}</h3>
      </div>

      const root = document.querySelector("[id='root']")
      React.render(root, App)
    `
    const babelOptions = {
      presets: [
        ['@babel/preset-env', { modules: false }],
      ],
      plugins: [
        '@babel/plugin-transform-react-jsx'
      ]
    }

    try {
      const result = await transformAsync(appCode, babelOptions)

      if (result && result.hasOwnProperty('code')) {
        const code = result.code
        const window = (new JSDOM(`<!DOCTYPE html><div id='root'></div>`)).window
        const sandbox = vm.createContext({
          React,
          user: { firstName: 'Sample', lastName: 'User' },
          document: window.document,
          window: window
        })

        vm.runInContext(code, sandbox, { displayErrors: true })

        // expect(sandbox.document.body.querySelector('[id="root"]').firstChild).toBe('DIV')
        // expect(sandbox.document.querySelector('[class="profile"]')).toBe(2)
        // expect(sandbox.document.querySelector('[class="app"]')).toBeDefined();
      }
    } catch (err) {
      console.error(err)
    }
  })

})
