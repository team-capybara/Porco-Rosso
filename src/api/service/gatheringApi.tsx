import { useQuery } from '@tanstack/react-query';
import { mockAxios } from '../config';
import {
  IGatheringInfo,
  GetFriendsListRes,
} from '../../features/gathering/types';
import apiClient from '../config';

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
    enabled: false,
  });
  return { isLoading, isFetching, data, isError, error, refetch };
};

const tempGatheringInfoData = {
  id: 1,
  title: '모이미 제목인데요오오오ㅗ오 ㅇ ㄹㄴㅇㄴㄹ ㄴㅇ ㄹㅇㄴ ㄹㅇㄴ',
  startedAt: '20240801100000',
  endedAt: null,
  location: {
    name: '스타벅스',
    latitude: 0,
    longitude: 0,
  },
  status: 'CREATED',
  participants: [
    {
      userId: 1,
      nickname: 'googletest',
      profileImageUrl: 'src/assets/png/test_image.png',
      isOwner: true,
    },
    {
      userId: 2,
      nickname: 'appletest',
      profileImageUrl: 'zxc.com',
      isOwner: false,
    },
    {
      userId: 3,
      nickname: 'admintest',
      profileImageUrl: 'qwe.com',
      isOwner: false,
    },
    {
      userId: 4,
      nickname: '맥주사랑이린',
      profileImageUrl: 'src/assets/png/test_image.png',
      isOwner: false,
    },
    {
      userId: 5,
      nickname: '맥주사랑이린',
      profileImageUrl: 'qwe.com',
      isOwner: false,
    },
  ],
  bestPhotoUrl: null, // 완료된 모임이면 있을 것
};

// {moimId}의 정보 조회
export const getGatheringInfo = (moimId: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoading, isFetching, data, isError, error, refetch } = useQuery({
    queryKey: ['get-gathering-info', moimId],
    queryFn: () => {
      return tempGatheringInfoData;
      // return axios.get('/moims/1').then(() => {
      // });
    },
    select: (data): IGatheringInfo => {
      console.log(data);
      return data;
    },
    enabled: false,
  });
  return { isLoading, isFetching, data, isError, error, refetch };
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
