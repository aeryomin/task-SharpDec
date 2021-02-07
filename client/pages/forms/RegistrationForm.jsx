/* eslint-disable no-console */
import React from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../../components/FormInput'
import Button from '../../components/Button'
import {
  setUsernameActionCreator,
  setEmailActionCreator,
  setFirstPasswordActionCreator,
  setSecondPasswordActionCreator
} from '../../redux/actionCreators/accountActionCreator'

const RegistrationForm = () => {
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
          <FormInput
            type="password"
            title="Repeat password"
            placeholder="Password"
            action={setSecondPasswordActionCreator}
          />
          <div className="ml-4 text-gray-400 flex items-center">
            <Button content="Registration" action="registration" />
            <div className="ml-4 text-gray-400 flex items-center">
              or
              <Link className="mx-1 text-blue-600" to="/login">
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
