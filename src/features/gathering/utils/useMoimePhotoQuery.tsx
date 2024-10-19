import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
  useQueryClient,
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

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    resetAndFetchFirstPage,
    totalPhotos,
  } as {
    data: InfiniteData<getMoimePhotoResponse> | undefined;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchNextPage: () => Promise<any>;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
    resetAndFetchFirstPage: () => Promise<void>;
    totalPhotos: number;
  };
};
