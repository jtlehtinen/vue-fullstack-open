import { useQuery } from '@tanstack/vue-query'
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
