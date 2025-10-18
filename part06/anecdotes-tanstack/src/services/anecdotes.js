const baseUrl = '/api/anecdotes'

async function handleResponse(response, defaultError = 'Unknown error occurred') {
  if (!response.ok) {
    let errorBody
    try {
      errorBody = await response.json()
    } catch {
      errorBody = null
    }

    const message = errorBody?.error || defaultError
    throw new Error(message)
  }

  return await response.json()
}

export async function getAll() {
  const response = await fetch(baseUrl)
  return await handleResponse(response, 'Failed to fetch anecdotes')
}

export async function create(content) {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })
  return await handleResponse(response)
}

export async function update(anecdote) {
  const response = await fetch(`${baseUrl}/${anecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  })

  return await handleResponse(response, 'Failed to update anecdote')
}

export default {
  create,
  getAll,
  update,
}
