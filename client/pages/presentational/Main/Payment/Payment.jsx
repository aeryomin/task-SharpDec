import React, { useState, useEffect } from 'react'
import InputUser from './InputUser'
import Autocomplete, { filterUser } from './Autocomplete'
import InputPW from './InputPW'
import Button, { DO_DISPATCH } from '../../../../components/Button'
import { submitPayment } from '../../../../redux/actionCreators/transactionsActionCreator'

const Payment = (props) => {
  const { users } = props
  const [inputUserValue, setInputUserValue] = useState('')
  const [inputPWValue, setInputPWValue] = useState('')

  useEffect(() => {
    filterUser(users, inputUserValue)
  }, [inputUserValue])

  return (
    <div className="w-full md:w-1/2 h-1/3 m-2 mb-16">
      Do transaction
      <div className="h-full border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
        <div className="flex">
          <InputUser
            value={inputUserValue}
            setValue={setInputUserValue}
            users={users}
          />
          <InputPW value={inputPWValue} setValue={setInputPWValue} />
          <div className="flex items-end ml-2">
            <Button
              content="Commit"
              action={{
                type: DO_DISPATCH,
                payload: submitPayment
              }}
            />
          </div>
        </div>
        {inputUserValue && (
          <Autocomplete
            users={users}
            value={inputUserValue}
            setValue={setInputUserValue}
          />
        )}
      </div>
    </div>
  )
}

export default Payment
