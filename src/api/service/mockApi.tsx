import axios from 'axios';
import { mockAxios } from '../config';
import MockAdapter from 'axios-mock-adapter';
import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  InfiniteData,
  useQueryClient,
} from '@tanstack/react-query';
import { getMoimePhotoResponse, Photo } from '../../features/gathering/types';

const mock: MockAdapter = new MockAdapter(axios, { delayResponse: 2000 });

export const getMoimePhoto = async (
  moimId: string,
  cursorId: number | null,
  size: number
): Promise<getMoimePhotoResponse> => {
  try {
    const res = await mockAxios.get(
      `mock/moims/${moimId}/photos?size=${size}&cursorId=${cursorId}`
    );

    // 테스트 데이터 설정
    const defaultPhotoId = 1000;
    const decrementFactor = 5;

    res.data.data.forEach((el: Photo, idx: number) => {
      if (typeof cursorId !== 'number') {
        el.photoId = defaultPhotoId - decrementFactor * idx; // 테스트용 데이터
      } else {
        el.photoId = cursorId - decrementFactor * (idx + 1); // 테스트용 데이터
      }
    });

    console.warn('체크 response', res.data);
    console.warn('체크 cursorId', cursorId);

    if (cursorId !== null && cursorId < 500) {
      res.data.last = true;
    }

    const response: getMoimePhotoResponse = res.data;
    return response;
  } catch (error) {
    console.error('Error fetching Moime photos:', error);
    throw new Error('사진 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

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
  const totalPhotos = data?.pages[0].total || 0;

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

mock.onGet('/moims/newPhoto/true').reply(200, {
  isNew: true,
});

mock.onGet('/moims/newPhoto/false').reply(200, {
  isNew: false,
});
