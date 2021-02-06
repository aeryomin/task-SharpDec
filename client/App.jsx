import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import './main.scss'
import store, { history } from './redux'
import Startup from './startup'
import Home from './pages/presentational/Home'
import LoginForm from './pages/forms/LoginForm'
import RegistrationForm from './pages/forms/RegistrationForm'
import Main from './pages/presentational/Main'

const App = () => (
  <div>
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Startup>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route exact path="/login" component={() => <LoginForm />} />
              <Route exact path="/reg" component={() => <RegistrationForm />} />
              <Route exact path="/main" component={() => <Main />} />
            </Switch>
          </Startup>
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>
  </div>
)

const target = document.getElementById('root')

ReactDOM.render(<App />, target)
