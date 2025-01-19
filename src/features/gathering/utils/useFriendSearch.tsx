import { getFriendsList } from '../../../api/service/gatheringApi';
import {
  InfiniteData,
  keepPreviousData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { GetFriendsListRes } from '../types';

const useFriendSearch = (
  keyword: string,
  cursorId: number | null,
  size: number
) => {
  const {
    data, // 가져온 친구 목록 데이터
    isLoading, // 데이터 로딩 중 상태
    isFetching, // 추가 데이터 요청 중 상태
    isError, // 에러 상태
    error, // 발생한 에러 객체,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  }: UseInfiniteQueryResult<
    InfiniteData<GetFriendsListRes>,
    Error
  > = useInfiniteQuery({
    queryKey: ['friendsList', keyword, size], // 쿼리 키에 keyword만 사용해 재사용성 향상
    queryFn: ({ pageParam = null }) => getFriendsList(keyword, pageParam, size), // cursorId를 pageParam으로 사용
    // enabled: !!searchKeyword, // 검색어가 있을 때만 쿼리가 실행되도록 설정
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주됨
    getNextPageParam: (lastPage) => {
      return lastPage.last ? null : lastPage?.cursorId?.cursorId || null;
    },
    initialPageParam: cursorId,
    placeholderData: keepPreviousData,
  });

  return {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isSuccess,
  };
};
export { useFriendSearch };
