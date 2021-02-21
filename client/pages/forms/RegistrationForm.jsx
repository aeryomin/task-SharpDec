import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import FormInput from '../../components/FormInput'
import {
  setUsernameActionCreator,
  setEmailActionCreator,
  setPasswordActionCreator,
  setSecondPasswordActionCreator,
  registration
} from '../../redux/actionCreators/accountActionCreator'

const RegistrationForm = () => {
  const dispatch = useDispatch()
  const { password, secondPassword } = useSelector(
    (s) => s.account
  )
  const { handleSubmit, register, errors, getValues } = useForm()

  const havePasswords = () => Boolean(password) || Boolean(secondPassword)

  const isPasswodrsMatches = () => {
    return password === secondPassword
  }

  const onSubmit = () => {
    if (password === secondPassword) {
      dispatch(registration())
    }
  }

  return (
    <div className="w-screen h-screen bg-gray-100 flex justify-center items-center">
      <div className=" max-w-xs ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <FormInput
            type="text"
            name="username"
            title="Username"
            placeholder="Username"
            action={setUsernameActionCreator}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <FormInput
            type="text"
            name="email"
            title="E-mail"
            placeholder="jsmith@gmail.com"
            action={setEmailActionCreator}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <FormInput
            type="password"
            name="password"
            title="Password"
            placeholder="Password"
            action={setPasswordActionCreator}
            register={register}
            errors={errors}
            getValues={getValues}
          />
          <FormInput
            type="password"
            name="second password"
            title="Repeat password"
            placeholder="Password"
            action={setSecondPasswordActionCreator}
            register={register}
            errors={errors}
            getValues={getValues}
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
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 border border-blue-500 hover:bg-blue-700
                 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Signup
              </button>
            </div>
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
