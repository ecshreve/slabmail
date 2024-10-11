// /utils/debounce.ts
export function debounce<T extends (...args: any[]) => void>(
    func: T,
    waitFor: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
  
    return (...args: Parameters<T>): void => {
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        func(...args);
      }, waitFor);
    };
  }
  