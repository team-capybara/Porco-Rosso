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

export const getNextQuarterHour = () => {
  const now = new Date();
  const parsedTime = now.toLocaleString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  let nextHour = '';
  let nextMinute = '';
  let selectedMinute = Infinity; // 초기값을 무한대로 설정
  const quarterMinutes = [60, 45, 30, 15];
  const nowMinute = parsedTime.split(':')[1];
  const nowHour = parsedTime.split(':')[0];

  // 다음 15분 단위 찾기
  for (const quarter of quarterMinutes) {
    if (quarter > Number(nowMinute)) {
      selectedMinute = Math.min(quarter, selectedMinute);
    }
  }

  // selectedMinute가 60이면 다음 시간으로 넘어감
  if (selectedMinute === 60) {
    nextHour = String(Number(nowHour) + 1);
    nextMinute = '00';
  } else {
    nextHour = nowHour;
    nextMinute = String(selectedMinute);
  }

  return `${nextHour.padStart(2, '0')}:${nextMinute}`;
};
