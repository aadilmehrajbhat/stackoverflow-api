import { useRef, useEffect, MutableRefObject, useCallback } from 'react';

type Props<T> = {
  root: MutableRefObject<T | null>;
  callback: () => void;
};

function useClickAway<T>({ root, callback }: Props<T>) {
  const callbackRef = useRef(callback);

  const onClickAway = useCallback(
    (e) => {
      if (root?.current) {
        const $rootEl = root.current as unknown as HTMLElement;
        const $targetEl = e.target;

        !$rootEl.contains($targetEl) && callbackRef?.current();
      }
    },
    [root],
  );

  useEffect(() => {
    document.body.addEventListener('click', onClickAway);

    return () => document.body.removeEventListener('click', onClickAway);
  }, [onClickAway]);
}

export default useClickAway;
