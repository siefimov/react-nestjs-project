import { useMemo } from 'react';

export function useSortedItems<T>(
  data: T[],
  getValue: (item: T) => string | number,
) {
  return useMemo(() => {
    return data.slice().sort((a, b) => {
      const aValue = getValue(a);
      const bValue = getValue(b);

      if (
        typeof aValue === 'string' &&
        !isNaN(Date.parse(aValue)) &&
        typeof bValue === 'string' &&
        !isNaN(Date.parse(bValue))
      ) {
        return new Date(aValue).getTime() - new Date(bValue).getTime();
      }

      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    });
  }, [data, getValue]);
}
