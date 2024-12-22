import { useInfiniteQuery } from '@tanstack/react-query'

import { tokenApi } from '@/api/token'
import { TokenListItem } from '@/api/token/types'

export const useTokens = () => {
  const {
    data: { tokens = [], totalToken = 0 } = {},
    isLoading,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [tokenApi.getList.name],
    queryFn: ({ pageParam }) => {
      return tokenApi.getList([
        ['page', pageParam.toString()],
        ['page_size', '25'],
        ['orderby', 'type'],
        ['orderby', '-marketcap'],
        ['orderby', '-time'],
      ])
    },
    initialPageParam: 1,
    getNextPageParam: (_, __, page) => page + 1,
    select: (data) => {
      return ({
        totalToken: data.pages[0].data.length,
        tokens: data.pages
          .flatMap((p) => p.data)
          .filter(Boolean) as TokenListItem[],
      })
    },
  })

  console.log("tokens: ", tokens);

  return {
    totalToken,
    tokens,
    isLoading,
    isFetching,
    fetchNextPage,
  }
}
