import { toast } from 'react-hot-toast';

interface ToastOptions {
  message: string;
  onClickEnabled: boolean;
  onClick?: () => void; // 클릭 시 실행될 함수
  duration?: number; // 지속 시간 (기본값: 3000)
  id?: string; // 토스트의 고유 ID (중복 방지)
}

export const useMoimeToast = () => {
  const moimeToast = ({
    message,
    onClickEnabled = false,
    onClick,
    duration = 3000,
    id = 'default-toast-id',
  }: ToastOptions) => {
    toast(
      (t) => (
        <div style={{ display: 'flex' }}>
          {onClickEnabled && onClick !== undefined && (
            <button
              style={{
                fontSize: '24px',
                marginRight: '16px',
                background: 'white',
              }}
              onClick={() => {
                toast.dismiss(t.id); // 토스트 닫기
                onClick(); // 전달된 onClick 함수 실행
              }}
            >
              ⏫
            </button>
          )}
          <div style={{ margin: '0', padding: '2px', lineHeight: '32px' }}>
            {message} {/* 전달된 메시지 표시 */}
          </div>
        </div>
      ),
      { duration, id } // 사용자 지정 지속 시간 및 ID 설정
    );
  };

  return { moimeToast };
};
