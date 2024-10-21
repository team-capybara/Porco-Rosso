import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { getMoimePhotoResponse } from '../types';
import { getMoimePhoto } from '../../../api/service/photoApi';

const QUERY_KEYS = {
  MOIM_PHOTO: 'moimPhoto',
};

export const useMoimePhotoQuery = (moimId: string, cursorId: number | null) => {
  const queryClient = useQueryClient();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }: UseInfiniteQueryResult<
    InfiniteData<getMoimePhotoResponse>,
    Error
  > = useInfiniteQuery({
    queryKey: [QUERY_KEYS.MOIM_PHOTO, moimId], // queryKey
    queryFn: ({ queryKey, pageParam }) => {
      console.warn('queryKey', 'pageParam', queryKey, pageParam);
      // 수정필요함
      const queryMoimId = queryKey[1] as string;
      return getMoimePhoto(queryMoimId, pageParam, 18); // queryFn
    },
    getNextPageParam: (lastPage) => {
      return lastPage.last
        ? null
        : lastPage.data[lastPage.data.length - 1]?.photoId || null;
    },
    initialPageParam: cursorId,

    // REACT QUERY 옵션
    staleTime: 1000 * 60 * 30, // 30분 동안 데이터를 fresh 상태로 유지
    gcTime: 1000 * 60 * 120, // 120분 동안 동안 캐시에 데이터 유지
    refetchOnWindowFocus: false, // 창 포커스 시 자동 refetch 비활성화
    refetchOnReconnect: false, // 네트워크 재연결 시 refetch 비활성화
    placeholderData: keepPreviousData, // 새로운 데이터가 로딩될 때 이전 데이터를 유지
  });

  // 첫 페이지부터 데이터를 다시 불러오는 함수
  const resetAndFetchFirstPage = async () => {
    // 기존 데이터를 빈 배열로 설정
    queryClient.setQueryData([QUERY_KEYS.MOIM_PHOTO, moimId], () => ({
      pages: [],
      pageParams: [],
    }));

    // 첫 페이지를 fetchNextPage로 불러오기
    await fetchNextPage(); // 첫 페이지부터 데이터를 다시 불러옴
  };

  // 전체 사진 개수(total) 계산
  const totalPhotos = data?.pages[0]?.total || 0;

  // 첫 번째 사진 ID
  const firstPhotoId = data?.pages[0]?.data?.[0]?.photoId || null;

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    resetAndFetchFirstPage,
    totalPhotos,
    firstPhotoId,
  } as {
    data: InfiniteData<getMoimePhotoResponse> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchNextPage: () => Promise<any>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    resetAndFetchFirstPage: () => Promise<void>;
    totalPhotos: number;
    firstPhotoId: number | null;
  };
};
