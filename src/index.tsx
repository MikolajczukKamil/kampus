import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import reportWebVitals from './reportWebVitals'

import './index.css'


/**
 * In Tooltip
 *
 * Warning: findDOMNode is deprecated in StrictMode.
 * findDOMNode was passed an instance of Transition which is inside StrictMode.
 * Instead, add a ref directly to the element you want to reference.
 * Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
 */
ReactDOM.render(
  // <React.StrictMode>
    <App/>,
  // </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
