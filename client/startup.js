import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { tryLogIn } from './redux/actionCreators/accountActionCreator'

const Startup = (props) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tryLogIn())
  }, [])

  return props.children
}

export default Startup
