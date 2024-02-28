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
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      //queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({content, id: randomId(), votes:0})
    dispatch({type: 'SET', payload: 'Added ' + content})
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
