import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './main.scss'
import store from './redux'
// import Main from './pages/Main'
import Registration from './pages/Registration'

const App = () => (
  <div>
    <React.StrictMode>
      <Provider store={store}>
        <Registration />
      </Provider>
    </React.StrictMode>
  </div>
)

const target = document.getElementById('root')

ReactDOM.render(<App />, target)
