import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnecdotesStore = defineStore('anecdotes', () => {
  const anecdotes = ref([])

  function $reset() {
    anecdotes.value = []
  }

  function add(content) {
    const newAnecdote = {
      id: nanoid(),
      content,
      votes: 0,
    }
    anecdotes.value = [...anecdotes.value, newAnecdote]
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
    add,
    vote,
  }
})
