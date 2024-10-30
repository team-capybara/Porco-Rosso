import { GetNotificationsReponse } from '../../features/notification/types';
import apiClient from '../config';

export const getNotifications = async (
  page: number,
  size: number
): Promise<GetNotificationsReponse> => {
  try {
    const res = await apiClient.get(
      `/users/notifications?page=${page}&size=${size || 10}`
    );

    const response: GetNotificationsReponse = res.data;
    return response;
  } catch (error) {
    console.error('Error fetching Moime photos:', error);
    throw new Error('사진 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};
