import React, { useState, useEffect } from 'react'
import InputUser from './InputUser'
import Autocomplete, { filterUser } from './Autocomplete'
import InputPW from './InputPW'
import Button, { DO_DISPATCH } from '../../../../components/Button'

const Payment = (props) => {
  const { users } = props
  const [inputUserValue, setInputUserValue] = useState('')
  const [inputPWValue, setInputPWValue] = useState('')

  useEffect(() => {
    filterUser(users, inputUserValue)
  }, [inputUserValue])

  return (
    <div className="border border-gray-200 rounded w-1/2 h-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
      <div className="flex">
        <InputUser
          value={inputUserValue}
          setValue={setInputUserValue}
          users={users}
        />
        <InputPW value={inputPWValue} setValue={setInputPWValue} />
        <Button
          content="Commit"
          action={{
            type: DO_DISPATCH,
            payload: ''
          }}
        />
      </div>
      {inputUserValue && (
        <Autocomplete
          users={users}
          value={inputUserValue}
          setValue={setInputUserValue}
        />
      )}
    </div>
  )
}

export default Payment
