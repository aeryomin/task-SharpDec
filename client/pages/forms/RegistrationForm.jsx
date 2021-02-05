/* eslint-disable no-console */
import React from 'react'
import FormInput from '../../components/FormInput'
import { setUsernameActionCreator } from '../../redux/actionCreators/setUserActionCreator'

const RegistrationForm = () => {
  console.log(setUsernameActionCreator)
  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className=" max-w-xs ">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <FormInput action={setUsernameActionCreator} />
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
              <input
                className=""
                id="username"
                type="text"
                placeholder="Username"
                value={usernameInputValue}
                onChange={(event) => {
                  setUsernameInputValue(event.target.value)
                }}
              />
            </label> */}
          </div>
          <div className="mb-6">
            {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
              <input
                className=""
                id="password"
                type="password"
                placeholder="******************"
                value={passwordInputValue}
                onChange={(event) => {
                  setPasswordInputValue(event.target.value)
                }}
              />
            </label> */}
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegistrationForm
