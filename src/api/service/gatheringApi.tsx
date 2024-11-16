import apiClient from '../config';
import {
  IGatheringInfo,
  GetFriendsListRes,
  CreateGatheringData,
  Photo,
} from '../../features/gathering/types';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

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
  try {
    const response = await apiClient.post('/moims', gatheringData);
    return response.data;
  } catch (error) {
    console.error('Error create gathering', error);
    throw error;
  }
};

// 모임 수정
export const reviseMoim = async (
  gatheringData: CreateGatheringData,
  moimId: number
): Promise<void> => {
  // void면 서버에서 응답 데이터가 빈값이라는 걸 의미하므로, 응답 값에도 타입 지정 필요함
  try {
    const response = await apiClient.put(`/moims/${moimId}`, gatheringData);
    return response.data;
  } catch (error) {
    console.error('Error create gathering', error);
    throw error;
  }
};

// 모임삭제
export const removeMoim = async (moimId: number): Promise<void> => {
  try {
    const response = await apiClient.delete(`/moims/${moimId}`);
    console.log(response.data, '모임삭제 성공');
    return response.data;
  } catch (error) {
    console.error('Error create gathering', error);
    throw error;
  }
};

// 모임 나가기 (removeTrace : 추억 남길지 여부)
export const leaveMoim = async (moimId: number, removeTrace: boolean) => {
  try {
    //url = `/moims/${moimId}/leave?removeTrace=${removeTrace}`;
    // 위처럼 보내는 거랑 같은 것
    const response = await apiClient.put(`/moims/${moimId}/leave`, null, {
      params: { removeTrace: removeTrace },
    });
    return response.data;
  } catch (error) {
    console.error('Error leave Moim : ', error);
    throw error;
  }
};

// 진행 전 모임 나가기는 따로
export const rejectMoim = async (moimId: number) => {
  try {
    const response = await apiClient.put(`/moims/${moimId}/reject`);
    return response.data;
  } catch (error) {
    console.error('Error leave Moim : ', error);
    throw error;
  }
};

// 모임 상태 확인
export const getMoimStatus = async (moimId: number) => {
  try {
    const response = await apiClient.get(`/moims/${moimId}/status`);
    return response.data.status;
  } catch (error) {
    // error를 AxiosError 타입으로 안전하게 캐스팅
    if (axios.isAxiosError(error)) {
      const {
        errorCode = 0,
        errorMessage = '',
        errorName = '',
        statusCode = 0,
      } = error.response?.data || {};
      console.error('Error get Moim Status:', errorCode, error);
      // 에러 코드가 포함된 에러 객체를 그대로 throw
      throw {
        errorCode,
        errorMessage,
        errorName,
        statusCode,
      };
    } else {
      console.error('Unknown Error:', error);
      throw error;
    }
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
    return response.data;
  } catch (error) {
    console.error('Error adding friends to Moim:', error);
    throw error;
  }
};

// 모임 종료 (진행중 => 종료)
export const finishMoim = async (moimId: number) => {
  try {
    const response = await apiClient.put(`/moims/${moimId}/finish`);
    return response.data.status;
  } catch (error) {
    console.error('Error finish Moim : ', error);
    throw error;
  }
};

export const getFriendCnt = async (): Promise<number> => {
  try {
    const response = await apiClient.get('/users/friends/followings/count');
    return response.data;
  } catch (error) {
    console.error('Error fetching user friend count:', error);
    throw error;
  }
};

export const getSelectedPhotos = async (moimId: number) => {
  try {
    const response = await apiClient.get(`/moims/${moimId}/photos/selected`);
    return response.data.data as Photo[];
  } catch (error) {
    console.error('Error fetching getSelectedPhotos:', error);
    throw error; // 에러 처리 (필요에 따라 사용)
  }
};

// 모임정보 전역으로 쓰기 위해서(캐싱용)
const GATHRING_INFO = 'GATHRING_INFO';
export const useGatheringInfoQuery = (moimId: string) => {
  return useQuery({
    queryKey: [GATHRING_INFO, moimId],
    queryFn: () => getGatheringInfo(Number(moimId)),
    staleTime: 1 * 60 * 1000, // 5분 동안 데이터를 신선한 상태로 유지
    gcTime: 5 * 60 * 1000, // 30분 동안 캐시 유지
    refetchOnWindowFocus: true, // 창 포커스시 자동 refetch
  });
};
