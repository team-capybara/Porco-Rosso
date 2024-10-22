export const calculateRemainingTime = (startTime: string) => {
  const startDate = new Date(
    Number(startTime.slice(0, 4)), // YYYY
    Number(startTime.slice(4, 6)) - 1, // MM (0-based index)
    Number(startTime.slice(6, 8)), // DD
    Number(startTime.slice(9, 11)), // HH
    Number(startTime.slice(11, 13)) // MM
  );

  const now = new Date();
  const diff = startDate.getTime() - now.getTime();

  if (diff <= 0) {
    return '00:00:00';
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};
