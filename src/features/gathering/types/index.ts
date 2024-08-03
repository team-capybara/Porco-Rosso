export interface UpcomingGatheringProps {}

export interface OngoingGatheringProps {}

export interface EndedGatheringProps {}

export interface PicturePickProps {}

export interface ShareProps {}

export interface GalleryGridProps {}

export interface Photo {
  liked: boolean;
  likes: number;
  photoId: number;
  uploadedAt: string;
  uploaderId: number;
  uploaderProfile: string;
  url: string;
}

export interface getMoimePhotoResponse {
  data: Array<Photo>;
  last: boolean;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  total: number;
}

export interface MoimePhoto {
  photoId: number;
  url: string;
  uploadedAt: string;
  uploaderId: number;
  uploaderProfile: string;
  liked: boolean;
  likes: number;
}

export type ongoingType = 'OngoingMain' | 'PhotoList' | 'PhotoDetail' | 'reset';

export interface CreateGatheringProps {}
