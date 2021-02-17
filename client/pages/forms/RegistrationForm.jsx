import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormInput from '../../components/FormInput'
import Button, { DO_DISPATCH, EMPTY } from '../../components/Button'
import {
  setUsernameActionCreator,
  setEmailActionCreator,
  setPasswordActionCreator,
  setSecondPasswordActionCreator,
  registration
} from '../../redux/actionCreators/accountActionCreator'

const RegistrationForm = () => {
  const { username, email, password, secondPassword } = useSelector(
    (s) => s.account
  )

  const getPayload =
    password === secondPassword && username !== '' && email !== ''
      ? { type: DO_DISPATCH, payload: registration }
      : { type: EMPTY }

  const havePasswords = () => Boolean(password) || Boolean(secondPassword)

  const isPasswodrsMatches = () => {
    return password === secondPassword
  }

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
            action={setPasswordActionCreator}
          />
          <FormInput
            type="password"
            title="Repeat password"
            placeholder="Password"
            action={setSecondPasswordActionCreator}
          />
          {!havePasswords() && <div className="h-8 mb-3" />}
          {isPasswodrsMatches() && havePasswords() && (
            <div className="h-8 text-green-600 mb-3">Passwords match</div>
          )}
          {!isPasswodrsMatches() && havePasswords() && (
            <div className="h-8 text-red-600 mb-3">
              Passwords don&apos;t match
            </div>
          )}

          <div className="flex justify-between items-center">
            <Button content="Registration" action={getPayload} />
            <div className="text-gray-400 flex items-center">
              or
              <Link className="ml-2 text-blue-600 hover:underline" to="/login">
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
