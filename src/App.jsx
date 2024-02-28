import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import * as anecdote from './requests'
import NotificationContext from './context/notificationContext'
import reducer from './reducers/notificationReducer'
import { useReducer } from 'react'

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, null)

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdote.update,
    onSuccess: (updated) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id === updated.id ? updated : a))
      //queryClient.invalidateQueries({queryKey: ['anecdotes']})
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({type: 'SET', payload: 'Voted ' + anecdote.content})
  }

  let anecdotes = []
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => anecdote.get(),
  })
  if (result.isLoading) {
    return <div>loading data...</div>
  } else if (result.isError) {
    return <span>Error: {result.error.message}</span>
  }
  else {
    anecdotes = result.data
  }

  return (
    <NotificationContext.Provider value={[ state, dispatch ]}>
      <div>
        <h3>Anecdote app</h3>
        <Notification />
        <AnecdoteForm />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
