import { useCallback, useRef } from 'react';

export type noop = (...args: any[]) => any;

/**
 * @see [详见](https://ahooks.js.org/zh-CN/hooks/advanced/use-persist-fn)
 * @see https://github.com/alibaba/hooks/blob/master/packages/hooks/src/usePersistFn/index.ts
 * @param fn
 */
function usePersistFn<T extends noop>(fn: T) {
  const ref = useRef<any>(() => {
    throw new Error('Cannot call function while rendering.');
  });

  ref.current = fn;

  const persistFn = useCallback(((...args) => ref.current(...args)) as T, [ref]); // eslint-disable-line

  return persistFn;
}

export default usePersistFn;
