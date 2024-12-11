import { feedApi } from '@/api/feed'
import { useInfiniteQuery } from '@tanstack/react-query'
export const useFeeds = () => {
  const { data, isLoading, isFetching, fetchNextPage } = useInfiniteQuery({
    queryKey: [feedApi.getList.name],
    queryFn: ({ pageParam }) => {
      return feedApi.getList({
        page: pageParam,
        limit: 10,
      })
    },
    initialPageParam: 1,
    getNextPageParam: (_, __, page) => page + 1,
  })

  console.log(data);


  return {
    data,
    isLoading,
    isFetching,
    fetchNextPage,
  }
}
