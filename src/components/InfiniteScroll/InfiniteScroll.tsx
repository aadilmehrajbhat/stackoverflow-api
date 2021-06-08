import { Key, RefObject, useEffect, useRef } from 'react';
import useIntersectionObserver, {
  Props as IntersectionObserverProps,
} from '../../hooks/useIntersectionObserver';

type InfiniteScrollProps<T, K> = {
  data: T[];
  itemProps: Omit<K, 'item' | 'itemRef'>;
  itemKey: keyof T;
  renderItem: ({
    item,
    itemRef,
  }: { item: T; itemRef: RefObject<Element> | null } & Omit<
    K,
    'item' | 'itemRef'
  >) => JSX.Element;
  scrollThreshold?: IntersectionObserverProps['rootMargin'];
  onScrollEnd: () => void;
};

function InfiniteScroll<T, K>({
  data,
  renderItem: Item,
  itemProps,
  itemKey,
  scrollThreshold,
  onScrollEnd,
}: InfiniteScrollProps<T, K>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { rootMargin: scrollThreshold });
  const isVisible = !!entry?.isIntersecting;

  useEffect(() => {
    isVisible && onScrollEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);
  return (
    <>
      {data.map((item, index) => (
        <Item
          item={item}
          itemRef={index === data.length - 1 ? ref : null}
          {...itemProps}
          key={item[itemKey] as unknown as Key}
        />
      ))}
    </>
  );
}

export default InfiniteScroll;
