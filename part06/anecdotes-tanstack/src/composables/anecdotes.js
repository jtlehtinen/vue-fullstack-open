import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import anecdotesService from '~/services/anecdotes.js'
import { useNotificationsStore } from '~/stores/notifications.js'

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
  const notifications = useNotificationsStore()

  const mutation = useMutation({
    mutationFn: anecdotesService.create,
    onError: (error) => {
      const message = error?.message || 'Unknown error'
      notifications.info(message)
    },
    onSuccess: (createdAnecdote) => {
      notifications.info(`Anecdote "${createdAnecdote.content}" created successfully`)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return mutation
}

export function useVoteAnecdote() {
  const queryClient = useQueryClient()
  const notifications = useNotificationsStore()

  const mutation = useMutation({
    mutationFn: async (anecdote) => {
      return await anecdotesService.update({
        ...anecdote,
        votes: anecdote.votes + 1
      })
    },
    onSuccess: (votedAnecdote) => {
      notifications.info(`You voted for '${votedAnecdote.content}'`)
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return mutation
}
