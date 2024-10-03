import { UserProfile } from '../../auth/types';

export interface mypageProps {}

export type renderComponentType =
  | 'mypageMain'
  | 'reviseProfile'
  | 'alarmSetting';

export interface MyPageMainProps {
  userProfile: UserProfile;
  setRenderComponent: React.Dispatch<React.SetStateAction<renderComponentType>>;
}
