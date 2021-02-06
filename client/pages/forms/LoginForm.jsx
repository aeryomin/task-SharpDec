/* eslint-disable no-console */
import React from 'react'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import {
  setUsernameActionCreator,
  setEmailActionCreator,
  setFirstPasswordActionCreator,
  logIn
} from '../../redux/actionCreators/accountActionCreator'

const LoginForm = () => {
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className=" max-w-xs ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <FormInput
            type="text"
            title="Username"
            placeholder="Username"
            action={setUsernameActionCreator}
          />
          <FormInput
            type="text"
            title="Email"
            placeholder="jsmith@gmail.com"
            action={setEmailActionCreator}
          />
          <FormInput
            type="password"
            title="Password"
            placeholder="Password"
            action={setFirstPasswordActionCreator}
          />
          <Button content="Log In" action={logIn} />
        </form>
      </div>
    </div>
  )
}

export default LoginForm
