import React, { useState, useEffect } from 'react'
import InputUser from './InputUser'
import Autocomplete, { filterUser } from './Autocomplete'
import InputPW from './InputPW'
import Button, { DO_DISPATCH } from '../../../../components/Button'
import { submitPayment } from '../../../../redux/actionCreators/transactionsActionCreator'

const Payment = (props) => {
  const {
    users,
    inputUserValue,
    setInputUserValue,
    inputPWValue,
    setInputPWValue
  } = props

  useEffect(() => {
    filterUser(users, inputUserValue)
  }, [inputUserValue])

  return (
    <div className="w-11/12 lg:h-1/3 mt-2 mb-2 lg:w-1/2">
      Do transaction
      <div className="relative border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
        <div className="flex justify-between">
          <InputUser
            value={inputUserValue}
            setValue={setInputUserValue}
            users={users}
          />
          <InputPW value={inputPWValue} setValue={setInputPWValue} />
          <div className="flex items-end">
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
