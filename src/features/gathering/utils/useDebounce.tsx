import { useState, useEffect } from 'react';

/**
 * useDebounce: 주어진 값이 변경될 때 일정 시간 지연 후 반영하는 훅
 * @param value - 디바운스 처리할 값
 * @param delay - 지연 시간 (밀리초)
 * @returns 디바운스된 값
 */
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay가 지나면 값이 반영됩니다.
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // cleanup: 이전 타이머를 지워서 최신 값만 반영
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export { useDebounce };
