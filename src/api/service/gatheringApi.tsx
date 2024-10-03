import apiClient, { mockAxios } from '../config';
import {
  IGatheringInfo,
  GetFriendsListRes,
  CreateGatheringData,
  mapPoint
} from '../../features/gathering/types';

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

// 모임 생성 관련 api
export const getFriendsList = async (
  keyword: string,
  cursorId: number | null,
  size: number
): Promise<GetFriendsListRes> => {
  try {
    const response = await apiClient.get<GetFriendsListRes>(
      `/users/friends/followings?size=${size}&cursorId=${cursorId || ''}&keyword=${keyword}`
    );
    console.log(response.data, '친구목록 불러오기');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const createMoim = async (
  gatheringData: CreateGatheringData
): Promise<void> => {
  // void면 서버에서 응답 데이터가 빈값이라는 걸 의미하므로, 응답 값에도 타입 지정 필요함
  console.log(gatheringData, '모임생성 요청은 가나');
  try {
    const response = await apiClient.post('/moims', gatheringData);
    console.log(response, '모임생성성공');
    return response.data;
  } catch (error) {
    console.error('Error create gathering', error);
    throw error;
  }
};
