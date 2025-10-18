import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnecdotesStore = defineStore('anecdotes', () => {
  const anecdotes = ref([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  function create(anecdote) {
    const id = `${Math.round(Math.random() * 10000)}`

    anecdotes.value = anecdotes.value.concat({
      ...anecdote,
      id
    })
  }

  function anecdoteById(id) {
    return anecdotes.value.find(a => a.id === id)
  }

  function vote(id) {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    anecdotes.value = anecdotes.value.map(a => a.id === id ? voted : a)
  }

  return {
    anecdotes,

    anecdoteById,
    create,
  }
})