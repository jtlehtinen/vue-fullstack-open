import { defineStore } from 'pinia'
import { ref } from 'vue'
import anecdotesService from '~/services/anecdotes'

export const useAnecdotesStore = defineStore('anecdotes', () => {
  const anecdotes = ref([])

  function $reset() {
    anecdotes.value = []
  }

  async function create(content) {
    const createdAnecdote = await anecdotesService.create(content)
    anecdotes.value = [...anecdotes.value, createdAnecdote]
  }

  async function init() {
    anecdotes.value = await anecdotesService.getAll()
  }

  async function vote(id) {
    const anecdoteToVote = anecdotes.value.find(a => a.id === id)
    if (!anecdoteToVote) throw new Error('Anecdote not found')

    const updatedAnecdote = await anecdotesService.update({
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1,
    })

    anecdotes.value = anecdotes.value.map(anecdote =>
      anecdote.id === id ? updatedAnecdote : anecdote
    )
  }

  return {
    anecdotes,

    $reset,
    create,
    init,
    vote,
  }
})
