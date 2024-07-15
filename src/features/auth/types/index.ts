type ProfilePicture = string | File;

// userProfile 에 사용되는 데이터 타입 모델링
export interface UserProfile {
  nickname: string;
  id: number;
  code: string;
  email: string;
  providerType: string;
  profile: ProfilePicture;
}

export interface UpdateProfile {
  nickname: string;
  profile: ProfilePicture;
}

// newProfile 컴포넌트에서 특화된 타입 정의
export interface NewProfileProps {
  userProfile: UserProfile;
  updateProfile: UpdateProfile;
  onSave: (updatedProfile: UpdateProfile) => void;
}

export interface ProfileImageProps {
  onChange: (file: File) => void;
}

export interface NicknameInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
