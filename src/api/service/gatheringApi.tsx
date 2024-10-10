import apiClient from '../config';
import {
  IGatheringInfo,
  GetFriendsListRes,
  CreateGatheringData,
} from '../../features/gathering/types';

// 진행중모임 - 지도 좌표
export const getMapLngLat = async (moimId: number) => {
  try {
    const response = await apiClient.get(`/moims/${moimId}/photos/locations`);
    // const response = await mockAxios.get(
    //   `/mock/moims/${moimId}/photos/locations`
    // );

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

// 모임 삭제
export const deleteMoim = async (moimId: number) => {
  try {
    const response = await apiClient.delete(`/moims/${moimId}`);
    return response.data;
  } catch (error) {
    console.error('Error delete Moim : ', error);
    throw error;
  }
};

// 모임 상태 확인
export const getMoimStatus = async (moimId: number) => {
  try {
    const response = await apiClient.get(`/moims/${moimId}/status`);
    return response.data;
  } catch (error) {
    console.error('Error get Moim Status : ', error);
    throw error;
  }
};

// 진행중 모임에서 친구 목록 수정
export const addFriendsToMoim = async (
  moimId: number,
  userIds: number[]
): Promise<void> => {
  try {
    const queryString = userIds.map((id) => `userIds=${id}`).join('&');
    const response = await apiClient.put(
      `/moims/${moimId}/invite?${queryString}`,
      null
    );
    console.log(response, '친구 추가 성공');
    return response.data;
  } catch (error) {
    console.error('Error adding friends to Moim:', error);
    throw error;
  }
};
