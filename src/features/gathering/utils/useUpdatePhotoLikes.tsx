import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { fetchLikesForPhotos } from '../../../api/service/photoApi';
import {
  FetchLikesForPhotosResponse,
  getMoimePhotoResponse,
  LikesForPhoto,
  Photo,
} from '../types';

const useUpdatePhotoLikes = (moimeId: string) => {
  const queryClient = useQueryClient();

  const updatePhotoLikes = async (pageNum: number) => {
    const oldData: InfiniteData<getMoimePhotoResponse> | undefined =
      queryClient.getQueryData(['moimPhoto', moimeId]);
    if (!oldData) return;

    const page = oldData.pages[pageNum];
    if (page.data.length === 0) return;

    const photoIds = page.data.map((photo: Photo) => photo.photoId);

    try {
      const response: FetchLikesForPhotosResponse = await fetchLikesForPhotos(
        moimeId,
        photoIds
      );
      const updatedLikes = response.data.reduce(
        (acc: Record<number, number>, photo: LikesForPhoto) => {
          acc[photo.photoId] = photo.likes;
          return acc;
        },
        {}
      );

      queryClient.setQueryData(['moimPhoto', moimeId], () => {
        const newPages = [...oldData.pages];
        newPages[pageNum] = {
          ...page,
          data: page.data.map((photo: Photo) => ({
            ...photo,
            likes: updatedLikes[photo.photoId] || photo.likes,
          })),
        };

        return { ...oldData, pages: newPages };
      });
    } catch (error) {
      console.error('좋아요 수 업데이트 실패:', error);
    }
  };

  return { updatePhotoLikes };
};

export default useUpdatePhotoLikes;
