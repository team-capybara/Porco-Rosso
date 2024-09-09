import { useQuery } from '@tanstack/react-query';
import apiClient, { mockAxios } from '../config';
import { IGatheringInfo } from '../../features/gathering/types';

// 진행중모임 - 지도 좌표
export const getMapLngLat = (moimId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ['get-map-lnglat', moimId],
    queryFn: () => {
      // return apiClient.get(`/moims/${moimId}/photos/locations`);

      return mockAxios.get(`mock/moims/${moimId}/photos/locations`);
    },
    select: (data) => {
      console.log(data);
      // return data.data;
      return data;
    },
    enabled: false,
  });
  return { isLoading, isFetching, data, isError, error, refetch };
};

// {moimId}의 정보 조회
export const getGatheringInfo = async (moimId: number) => {
  try {
    const response = await apiClient.get(`/moims/${moimId}`);
    console.log(response.data);
    return response.data as IGatheringInfo;
  } catch (error) {
    console.error('Error fetching getGatheringInfo:', error);
    throw error; // 에러 처리 (필요에 따라 사용)
  }
  // const { isLoading, isFetching, data, isError, error, refetch } = useQuery({
  //   queryKey: ['get-gathering-info', moimId],
  //   queryFn: () => {
  //     return tempGatheringInfoData;
  //     // return axios.get('/moims/1').then(() => {
  //     // });
  //   },
  //   select: (data): IGatheringInfo => {
  //     console.log(data);
  //     return data;
  //   },
  //   enabled: false,
  // });
  // return { isLoading, isFetching, data, isError, error, refetch };
};
