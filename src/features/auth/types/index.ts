type ProfilePicture = null | File;

// userProfile 에 사용되는 데이터 타입 모델링
export interface UserProfile {
  nickname: string;
  id: number;
  code: string;
  email: string;
  providerType: string;
  profile: string;
}

export interface UpdateProfile {
  nickname: string;
  newProfile: ProfilePicture;
}

// newProfile 컴포넌트에서 특화된 타입 정의
export interface NewProfileProps {
  userProfile: UserProfile;
  updateProfile: UpdateProfile;
  onSave: (updatedProfile: UpdateProfile) => void;
}

export interface ProfileImageProps {
  value: string;
  setProfile: React.Dispatch<React.SetStateAction<string>>;
  setIsProfileModify: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (file: File) => void;
}

export interface NicknameInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errMsg: string;
}
