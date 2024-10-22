import {
  FetchLikesForPhotosResponse,
  getMoimePhotoResponse,
} from '../../features/gathering/types';
import apiClient from '../config';

export const getMoimePhoto = async (
  moimId: string,
  cursorId: number | null,
  size: number
): Promise<getMoimePhotoResponse> => {
  try {
    const res = await apiClient.get(
      `/moims/${moimId}/photos?size=${size}&cursorId=${cursorId || ''}`
    );

    const response: getMoimePhotoResponse = res.data;
    return response;
  } catch (error) {
    console.error('Error fetching Moime photos:', error);
    throw new Error('사진 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

export const updatePhotoLike = async (
  moimId: string,
  photoId: number | null,
  beforeLikedState: boolean
): Promise<unknown> => {
  try {
    if (beforeLikedState === true) {
      const res = await apiClient.delete(
        `/moims/${moimId}/photos/${photoId}/like`
      );
      return res;
    } else {
      const res = await apiClient.post(
        `/moims/${moimId}/photos/${photoId}/like`
      );
      return res;
    }
  } catch (error) {
    console.error('Error fetching Moime photos:', error);
    throw new Error('사진 데이터를 불러오는 중 오류가 발생했습니다.');
  }
};

export const fetchLikesForPhotos = async (
  moimId: string,
  photoIds: number[]
): Promise<FetchLikesForPhotosResponse> => {
  try {
    const res = await apiClient.get(
      `moims/${moimId}/photos/likes?photoIds=${photoIds.join(',')}`
    );

    return res.data;
  } catch (error) {
    console.error('Error fetching Likes for Photos:', error);
    throw new Error('좋아요 수를 불러오는 중 오류가 발생했습니다..');
  }
};
