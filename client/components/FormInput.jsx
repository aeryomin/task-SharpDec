import React from 'react'
import { useDispatch } from 'react-redux'

const FormInput = (props) => {
  const {
    type,
    name,
    title,
    placeholder,
    action,
    register,
    errors,
    getValues
  } = props
  const borderColor = getValues(name) ? 'gray-200' : 'red-300'
  const dispatch = useDispatch()

  const onChange = (name) => {
    if (type === 'password') {
      dispatch(action(getValues(name)))
    }
  }

  const onBlur = (name) => {
    dispatch(action(getValues(name)))
  }

  const getRegister = (name) => {
    switch (name) {
      case 'username': {
        return register({
          required: 'Username required'
        })
      }
      case 'email': {
        return register({
          required: 'E-mail required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            message: 'Enter a valid email address'
          }
        })
      }
      case 'password':
      case 'second password': {
        return register({
          value: /.+/i,
          required: 'Password required'
        })
      }
      default:
        break
    }
    return ''
  }

  return (
    <div className="mb-3">
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor={`id-${title}`}
      >
        {title}
      </label>
      <input
        className={`shadow appearance-none border border-${borderColor} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        id={`id-${title}`}
        autoComplete="off"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={() => {
          onChange(name)
        }}
        onBlur={() => {
          onBlur(name)
        }}
        ref={getRegister(name)}
      />
      <span className="text-xs text-red-400">
        {errors[name] && errors[name].message}
      </span>
    </div>
  )
}

export default FormInput
