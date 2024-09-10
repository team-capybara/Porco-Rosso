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

export interface GatheringLocation {
  name: string;
  latitude: number;
  longitude: number;
}

export interface CreateGatheringData {
  title: string;
  participantIds: number[]; // 참가자의 ID 목록
  startedAt: string; // 모임 시작 시간 (ISO 8601 형식)
  location: GatheringLocation; // 모임 장소
}

export interface CalendarInputProps {
  value: string; // Assuming the date is in ISO string format
  onChange: (date: string) => void;
}

export type ChangeHandler<T> = (key: keyof T, value: T[keyof T]) => void;

export interface GatheringInfoInputsProps {
  gatheringData: CreateGatheringData;
  onChange: ChangeHandler<CreateGatheringData>;
  onPlaceSelect: (location: {
    name: string;
    latitude: number;
    longitude: number;
  }) => void;
}
