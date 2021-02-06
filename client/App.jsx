import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'
import './main.scss'
import store from './redux'
// import RegistrationForm from './pages/forms/RegistrationForm'
import LoginForm from './pages/forms/LoginForm'

const App = () => (
  <div>
    <React.StrictMode>
      <Provider store={store}>
        {/* <RegistrationForm /> */}
        <LoginForm />
      </Provider>
    </React.StrictMode>
  </div>
)

const target = document.getElementById('root')

ReactDOM.render(<App />, target)
