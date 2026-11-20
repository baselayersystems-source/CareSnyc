import { useCallback, useEffect, useState } from 'react';

/* Tiny hash router. Swap for react-router when your project grows. */
export function useHashRoute(fallback) {
  const read = () => location.hash.slice(1) || fallback;
  const [route, setRoute] = useState(read);

  useEffect(() => {
    const on = () => setRoute(read());
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);

  const navigate = useCallback((id) => {
    if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);
    setRoute(id);
  }, []);

  return [route, navigate];
}
