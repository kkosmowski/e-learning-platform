import { useLocation, useNavigate } from 'react-router';
import { useCallback } from 'react';

const history: string[] = [];

export default function useCustomNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const customNavigate = useCallback(
    (path: string, options?: { replace?: boolean; back?: string }) => {
      const back = options?.replace
        ? undefined
        : options?.back || location.pathname;
      if (back) history.push(back);
      navigate(path, { replace: options?.replace });
    },
    [location.pathname, navigate]
  );

  const back = useCallback(
    (path?: string) => {
      const latestHistoryItem = history.pop();
      navigate(path || latestHistoryItem || '..');
    },
    [navigate]
  );

  return { navigate: customNavigate, back };
}
