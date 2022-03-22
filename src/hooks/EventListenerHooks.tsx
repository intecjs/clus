import { useEffect } from 'react';

/**
 * Hook that handle clicks outside of the passed ref
 */
export function useClickOutsideEventListener(ref: React.RefObject<any>, callback: () => any) {
  useEffect(() => {
    /**
     * if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * Hook that handle push any keyboard event
 * @param ref
 * @param callback
 */
export function useAnyKeyEventListener(keys: KeyboardEvent['key'], callback: () => any) {
  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if (keys.includes(event.key)) {
        callback();
      }
    }
    // Bind the event listener
    document.addEventListener('keydown', handler);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('keydown', handler);
    };
  }, []);
}