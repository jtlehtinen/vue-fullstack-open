const baseUrl = '/api/anecdotes'

export async function getAll() {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

export default {
  getAll,
}
