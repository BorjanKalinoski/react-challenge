import { useEffect, useRef } from 'react';

// Custom hook that check if the component is mounted or not
// Used to prevent state updates when the component is not unmounted
export default function useIsMountedRef() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  });

  return isMountedRef;
}
