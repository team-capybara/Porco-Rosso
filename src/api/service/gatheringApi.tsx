import { useQuery } from '@tanstack/react-query';
import { mockAxios } from '../config';

// 진행중모임 - 지도 좌표
export const getMapLngLat = (moimId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ['get-map-lnglat', moimId],
    queryFn: () => {
      return mockAxios.get(`mock/moims/${moimId}/photos/locations`);
    },
    select: (data) => {
      return data;
    },
  });
  return { isLoading, isFetching, data, isError, error, refetch };
};
