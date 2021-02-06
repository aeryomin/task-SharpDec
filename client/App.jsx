import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'
import './main.scss'
import store from './redux'
import Home from './pages/presentational/Home'
import LoginForm from './pages/forms/LoginForm'
import RegistrationForm from './pages/forms/RegistrationForm'

const App = () => (
  <div>
    <React.StrictMode>
      <Provider store={store}>
        <Switch>
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/login" component={() => <LoginForm />} />
          <Route exact path="/registration" component={() => <RegistrationForm />} />
        </Switch>
      </Provider>
    </React.StrictMode>
  </div>
)

const target = document.getElementById('root')

ReactDOM.render(<App />, target)
