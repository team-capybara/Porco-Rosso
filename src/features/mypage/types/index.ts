import { UserProfile } from '../../auth/types';
import { useState, useEffect } from 'react';
import apiClient from '../../../api/config';

export interface mypageProps {}

export type renderComponentType =
  | 'mypageMain'
  | 'reviseProfile'
  | 'alarmSetting';

export interface MyPageMainProps {
  userProfile: UserProfile;
  setRenderComponent: React.Dispatch<React.SetStateAction<renderComponentType>>;
}

// alarmHook
export type SettingType =
  | 'MOIM_INVITATED'
  | 'MOIM_STARTED'
  | 'MOIM_FINISHED'
  | 'MOIM_COMPLETED'
  | 'MOIM_OWNER_ASSIGNED'
  | 'FOLLOWER_ADDED';

interface Settings {
  isMoimInvitatedOn: boolean;
  isMoimStartedOn: boolean;
  isMoimFinishedOn: boolean;
  isMoimCompletedOn: boolean;
  isMoimOwnerAssignedOn: boolean;
  isFollowerAddedOn: boolean;
}

interface UseSettingsResult {
  settings: Settings;
  updateSetting: (type: SettingType, value: boolean) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const useSettings = (): UseSettingsResult => {
  const [settings, setSettings] = useState<Settings>({
    isMoimInvitatedOn: false,
    isMoimStartedOn: false,
    isMoimFinishedOn: false,
    isMoimCompletedOn: false,
    isMoimOwnerAssignedOn: false,
    isFollowerAddedOn: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 초기 설정 값을 가져오는 함수
  const fetchSettings = async () => {
    try {
      const response = await apiClient.get('/users/notifications/settings');
      console.warn(response.data);
      setSettings(response.data);
    } catch (err) {
      console.error('설정 값을 가져오는 중 오류 발생:', err);
      setError('설정 값을 가져오는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // 설정 값을 업데이트하는 함수
  const updateSetting = async (type: SettingType, value: boolean) => {
    try {
      await apiClient.put('/users/notifications/settings', {
        type: type,
        turnOn: value,
      });
      fetchSettings();
    } catch (err) {
      console.error(`${type} 설정 업데이트 중 오류 발생:`, err);
      setError(`${type} 설정 업데이트 중 오류가 발생했습니다.`);
    }
  };

  return {
    settings,
    updateSetting,
    loading,
    error,
  };
};
