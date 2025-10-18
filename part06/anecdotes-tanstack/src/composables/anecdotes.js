import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import anecdotesService from '~/services/anecdotes.js'

export function useAnecdotes() {
  const { data, ...rest } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
  })

  return {
    anecdotes: data,
    ...rest,
  }
}

export function useCreateAnecdote() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return mutation
}

export function useVoteAnecdote() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (anecdote) => {
      return await anecdotesService.update({
        ...anecdote,
        votes: anecdote.votes + 1
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return mutation
}
