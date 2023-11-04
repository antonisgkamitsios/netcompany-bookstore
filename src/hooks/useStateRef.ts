import { useCallback, useState } from 'react';

type ProcessNode<T> = (node: HTMLElement) => T;

function useStateRef<T>(processFn: ProcessNode<T>) {
  const [node, setNode] = useState<T | undefined>();

  // we can add sideEffects feature in case we want to re process node after something happens
  const ref = useCallback(
    (node: HTMLElement) => {
      if (node != null) {
        setNode(processFn(node));
      }
    },
    [processFn]
  );

  return [ref, node] as const;
}

export { useStateRef };
