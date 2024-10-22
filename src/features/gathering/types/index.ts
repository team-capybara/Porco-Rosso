import { ReactNode } from 'react';

export interface UpcomingGatheringProps {}

export interface OngoingGatheringProps {}

export interface EndedGatheringProps {}

export interface PicturePickProps {}

export interface ShareProps {}

export interface GalleryGridProps {}

export interface ModalContentsProps {
  title: string;
  description?: ReactNode;
  firstButton: string;
  onClickFirstButton: () => void;
  secondButton?: string;
  onClickSecondButton?: () => void;
}

export interface Photo {
  liked: boolean;
  likes: number;
  photoId: number;
  uploadedAt: string;
  uploaderId: number;
  uploaderProfile: string;
  url: string;
}

export interface PhotoCardProps {
  moimId: string;
  photoId: number;
  photoUrl?: string;
  profileUrl?: string;
  likes?: number;
  liked?: boolean;
  likeButtonEnabled?: boolean;
  onClickHandler?: (selectedPhotoId: string) => void;
  isJustImg?: boolean;
}

export interface SelectedPhotoCardProps {
  photoId: number;
  photoUrl?: string;
  profileUrl?: string;
  likes?: number;
  liked?: boolean;
  likeButtonEnabled?: boolean;
  likeButtonHandler?: () => void;
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

export interface LikesForPhoto {
  photoId: number;
  likes: number;
}

export interface FetchLikesForPhotosResponse {
  data: Array<LikesForPhoto>;
  total: number;
}

export type ongoingType = 'OngoingMain' | 'PhotoList' | 'PhotoDetail' | 'reset'; // reset => 리렌더링을 위해서

export type memoryType = 'Memory' | 'Share';

export type moimStatusType =
  | 'CREATED'
  | 'ONGOING'
  | 'FINISHED'
  | 'COMPLETED'
  | 'FAILED';

export interface CreateGatheringProps {}

export interface mapPoint {
  latitude: number;
  longitude: number;
}

export interface mapDataInfo {
  locations: mapPoint[];
  max: mapPoint;
  min: mapPoint;
}

export interface IGatheringInfo {
  id: number;
  title: string;
  startedAt: string;
  endedAt: string | null;
  location: GatheringLocation;
  status: moimStatusType;
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

export interface GatheringLocation extends mapPoint {
  name: string;
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
  onTimeSelect: (time: string) => void;
  timeData: string;
  mode: 'read' | 'update';
}

export type Friend = {
  blocked: boolean;
  code: string;
  friendId: number;
  friendshipDate: string;
  nickname: string;
  id: number;
  profile: string;
};

type Cursor = {
  cursorId: number;
};

export interface GetFriendsListRes {
  data: Array<Friend>;
  last: boolean;
  cursorId: Cursor | null;
}

export interface InviteFriendsProps {
  setLayerOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  moimStart: boolean;
  setParticipantDataList?: React.Dispatch<
    React.SetStateAction<IParticipants[]>
  >;
  selectedFriends: number[];
  setSelectedFriends: React.Dispatch<React.SetStateAction<number[]>>;
  moimId?: number; //모임 생성 단계에서는 모임 아이디 발급 전
  participantData: IParticipants[];
  moimStatus: moimStatusType;
  isUserAndOwner?: boolean;
  ownerId: number | null;
  setFriendAddSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
}
