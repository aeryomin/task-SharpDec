import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector, Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'
import './main.scss'
import store, { history } from './redux'
import Startup from './startup'
import Home from './pages/presentational/Home'
import LoginForm from './pages/forms/LoginForm'
import RegistrationForm from './pages/forms/RegistrationForm'
import Main from './pages/presentational/Main'

const AnonymousRoute = ({ component: Component, ...rest }) => {
  const account = useSelector((s) => s.account)
  const func = (props) =>
    !!account.user && !!account.token ? (
      <Redirect to={{ pathname: '/main' }} />
    ) : (
      <Component {...props} />
    )
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const account = useSelector((s) => s.account)
  const func = (props) =>
    !!account.user && !!account.token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const App = () => (
  <div>
    <React.StrictMode>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Startup>
            <Switch>
              <Route exact path="/" component={() => <Home />} />
              <Route exact path="/reg" component={() => <RegistrationForm />} />
              <AnonymousRoute
                exact
                path="/login"
                component={() => <LoginForm />}
              />
              <PrivateRoute
                exact
                path="/main"
                component={() => <Main />}
              />
            </Switch>
          </Startup>
        </ConnectedRouter>
      </Provider>
    </React.StrictMode>
  </div>
)

const target = document.getElementById('root')

ReactDOM.render(<App />, target)
