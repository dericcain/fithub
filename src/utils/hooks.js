import { useReducer, useRef, useEffect } from 'react';

// This is a safe set state which makes sure the component is mounted before making an update.
export const useSetState = () => {
  const [state, setState] = useReducer(
    (oldState, newState) => ({ ...oldState, ...newState }),
    {
      loaded: false,
      fetching: false,
      data: null,
      error: null,
    },
  );

  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const safeSetState = (...args) => mountedRef.current && setState(...args);

  return [state, safeSetState];
};
