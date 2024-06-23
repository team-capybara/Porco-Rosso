import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 진행중모임 - 지도 좌표
export const getMapLngLat = (moimId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ['get-map-lnglat', moimId],
    queryFn: () => {
      return axios.get(
        `https://moime.app/mock/moims/${moimId}/photos/locations`,
        {
          headers: { 'x-dummy-auth-id': 1 },
        }
      );
    },
    select: (data) => {
      return data;
    },
  });
  return { isLoading, isFetching, data, isError, error, refetch };
};
