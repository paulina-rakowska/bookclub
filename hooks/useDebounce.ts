import { useEffect, useState } from "react";

const useDebounce = (value: string, delay: number) => {
  const [debounceVal, setDebouncedVal] = useState<string>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedVal(value), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debounceVal;
};

export default useDebounce;
