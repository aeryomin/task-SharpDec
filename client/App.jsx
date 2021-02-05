import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './main.scss'
import store from './redux'
// import Main from './pages/Main'
import RegistrationForm from './pages/forms/RegistrationForm'

const App = () => (
  <div>
    <React.StrictMode>
      <Provider store={store}>
        <RegistrationForm />
      </Provider>
    </React.StrictMode>
  </div>
)

const target = document.getElementById('root')

ReactDOM.render(<App />, target)
