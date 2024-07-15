type ProfilePicture = string | File;

// userProfile 에 사용되는 데이터 타입 모델링
export interface UserProfile {
  profilePicture: ProfilePicture;
  nickname: string;
  id: number;
  code: string;
  email: string;
  providerType: string;
  profile: ProfilePicture;
}

// newProfile 컴포넌트에서 특화된 타입 정의
export interface newProfileProps {
  userProfile: UserProfile;
  onSave: (updatedProfile: UserProfile) => void;
}
