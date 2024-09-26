import apiClient, { mockAxios } from '../config';
import { IGatheringInfo, mapPoint } from '../../features/gathering/types';

// 진행중모임 - 지도 좌표
export const getMapLngLat = async (moimId: number) => {
  try {
    // const response = await apiClient.get(`/moims/${moimId}/photos/locations`);
    const response = await mockAxios.get(
      `mock/moims/${moimId}/photos/locations`
    );
    // bound 계산 -> 서버에서 파라미터 오면 변경예정
    if (response.data.data.length > 0) {
      const bound = {
        max: {
          latitude: 0,
          logtitude: 0,
        },
        min: {
          latitude: 100,
          logtitude: 300,
        },
      };
      response.data.data.forEach((element: mapPoint) => {
        bound.min.latitude = Math.min(bound.min.latitude, element.latitude);
        bound.max.latitude = Math.max(bound.max.latitude, element.latitude);
        bound.min.logtitude = Math.min(bound.min.logtitude, element.logtitude);
        bound.max.logtitude = Math.max(bound.max.logtitude, element.logtitude);
      });
      response.data.bound = bound;
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching getMapLngLat:', error);
    throw error; // 에러 처리 (필요에 따라 사용)
  }
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
};
