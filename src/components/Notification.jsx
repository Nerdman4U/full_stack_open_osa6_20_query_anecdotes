import reducer from "../reducers/notificationReducer"
import { useContext, useEffect } from "react"
import NotificationContext from "../context/notificationContext"

const Notification = () => {
  const [ state, dispatch ] = useContext(NotificationContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({type: 'SET', payload: null})
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [state, dispatch])

  if (!state) return null

  return (
    <div style={style}>
      {state}
    </div>
  )
}

export default Notification
