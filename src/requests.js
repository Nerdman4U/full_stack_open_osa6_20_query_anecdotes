const baseUrl = 'http://localhost:3001/anecdotes'
export const get = () => fetch(baseUrl).then(res => res.json())
export const create = (anecdote) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(anecdote)
  }).then(res => res.json())        
}

export const update = (anecdote) => {
  return fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(anecdote)
  }).then(res => res.json())
}

