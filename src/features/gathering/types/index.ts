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

export type ongoingType = 'OngoingMain' | 'PhotoList' | 'PhotoDetail' | 'reset'; // reset => 리렌더링을 위해서

export type moimStatus =
  | 'CREATED'
  | 'ONGOING'
  | 'FINISHED'
  | 'COMPLETED'
  | 'FAILED';

export interface CreateGatheringProps {}

export interface mapPoint {
  latitude: number;
  longitude: number;
  logtitude: number;
}

export interface mapDataInfo {
  bound: {
    max: mapPoint;
    min: mapPoint;
  };
  data: mapPoint[];
  total: number;
}

export interface gatheringInfoLocation extends mapPoint {
  name: string;
}

export interface IGatheringInfo {
  id: number;
  title: string;
  startedAt: string;
  endedAt: string | null;
  location: gatheringInfoLocation;
  status: moimStatus;
  owner: IParticipants;
  participants: Array<IParticipants>;
  bestPhotoUrl: string | null; //완료된 모임에만 존재
}

export interface IParticipants {
  userId: number;
  nickname: string;
  profileImageUrl: string;
  isOwner: boolean;
}
