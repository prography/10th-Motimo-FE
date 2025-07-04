import { useOptimistic } from "react";

const useOptimisticToggle = (baseState: boolean) => {
  const [toggleState, setToggleStateOptimistically] = useOptimistic(
    baseState,
    (state, _) => !state,
  );
  return [toggleState, () => setToggleStateOptimistically(undefined)] as const;
};

export default useOptimisticToggle;
