import { useLocation, useNavigate } from 'react-router';
import { useCallback } from 'react';

export default function useCustomNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const customNavigate = useCallback(
    (path: string, options?: { replace?: boolean; back?: string }) => {
      const back = options?.replace
        ? undefined
        : options?.back || location.pathname;
      navigate(path, { state: { back }, replace: options?.replace });
    },
    [location.pathname, navigate]
  );

  const back = useCallback(
    (path?: string) => {
      const locationWithBack = location.state as { back?: string } | undefined;
      console.log(locationWithBack, path || locationWithBack?.back || './..');
      navigate(path || locationWithBack?.back || './..');
    },
    [location.state, navigate]
  );

  return { navigate: customNavigate, back };
}
