import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import FormInput from '../../components/FormInput'
import {
  setUsernameActionCreator,
  setEmailActionCreator,
  setPasswordActionCreator,
  logIn
} from '../../redux/actionCreators/accountActionCreator'

const LoginForm = () => {
  const dispatch = useDispatch()
  const { handleSubmit, register, errors, getValues } = useForm()

  const onSubmit = () => {
    dispatch(logIn())
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
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 border border-blue-500 hover:bg-blue-700
                 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Login
              </button>
            </div>

            <div className="text-gray-400 flex items-center">
              or
              <Link className="mx-1 text-blue-600 hover:underline" to="/reg">
                Sign up
              </Link>
              for PW
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
