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
export interface CreateGatheringProps {}

export interface IGatheringInfo {
  id: number;
  title: string;
  startedAt: string;
  endedAt: string | null;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  status: string;
  participants: Array<IParticipants>;
  bestPhotoUrl: string | null; //완료된 모임에만 존재
}

export interface IParticipants {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
}
