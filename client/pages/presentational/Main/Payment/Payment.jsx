import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import InputUser from './InputUser'
import Autocomplete, { filterUser } from './Autocomplete'
import InputPW from './InputPW'
import { submitPayment } from '../../../../redux/actionCreators/transactionsActionCreator'

const Payment = (props) => {
  const {
    users,
    inputUserValue,
    setInputUserValue,
    inputPWValue,
    setInputPWValue
  } = props
  const dispatch = useDispatch()

  useEffect(() => {
    filterUser(users, inputUserValue)
  }, [inputUserValue])

  return (
    <div className="w-11/12 mt-2 mb-2 lg:h-1/3 lg:w-5/12">
      Do transaction
      <div className=" lg:h-full relative border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ">
        <div className="flex justify-between">
          <InputUser
            value={inputUserValue}
            setValue={setInputUserValue}
            users={users}
          />
          <InputPW value={inputPWValue} setValue={setInputPWValue} />
          <div className="flex items-end">
            <button
              className="bg-blue-500 border border-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => {
                dispatch(submitPayment())
                setInputUserValue('')
                setInputPWValue('')
              }}
            >
              Commit
            </button>
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
