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
    store.anecdotes = await anecdotesService.getAll()
  }

  function vote(id) {
    anecdotes.value = anecdotes.value.map(anecdote =>
      anecdote.id === id
        ? { ...anecdote, votes: anecdote.votes + 1 }
        : anecdote
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
