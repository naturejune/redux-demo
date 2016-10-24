import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { todos } from '../reducers'
import App from '../components/App'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  combineReducers({ todos }),
  composeWithDevTools(
    applyMiddleware(
      createLogger()
    )
  )
)

const root = document.createElement('div');
document.body.append(root);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);