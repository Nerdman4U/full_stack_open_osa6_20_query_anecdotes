import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as anecdote from '../requests'
import { useContext } from 'react'
import NotificationContext from '../context/notificationContext'

const AnecdoteForm = () => {
  const [ state, dispatch ] = useContext(NotificationContext)

  const randomId = () => `${Date.now+Math.floor(Math.random()*1000)}`
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: anecdote.create,
    onError: (error) => {
      console.log('onError() error: ', error)
      dispatch({type: 'SET', payload: 'Error: ' + error.message})
    },
    onSuccess: (newAnecdote) => {
      console.log('onSuccess() newAnecdote: ', newAnecdote)
      //if (!newAnecdote) return
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      dispatch({type: 'SET', payload: 'Added ' + newAnecdote.content})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, id: randomId(), votes:0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
