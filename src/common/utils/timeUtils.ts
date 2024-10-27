export const calculateRemainingTime = (startTime: string) => {
  const startDate = new Date(
    Number(startTime.slice(0, 4)), // 연도 YYYY
    Number(startTime.slice(4, 6)) - 1, // 월 MM (0부터 시작)
    Number(startTime.slice(6, 8)), // 일 DD
    Number(startTime.slice(8, 10)), // 시 HH
    Number(startTime.slice(10, 12)) // 분 MM
  );
  const now = new Date(); // 현재 로컬 시간

  const diff = startDate.getTime() - now.getTime(); // 밀리초 차이 계산

  if (diff <= 0) {
    return '00:00:00'; // 시간이 이미 지난 경우
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
