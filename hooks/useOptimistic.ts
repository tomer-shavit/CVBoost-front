import { MixpanelFront } from "@/services/mixpanelFront";
import { MontioringErrorTypes } from "@/types/monitoring/errors";
import { useState, useEffect } from "react";

/**
 * A custom hook for managing optimistic UI updates in a generic manner.
 * @param initialValue The initial value of the state.
 * @param updater A function to update the state.
 * @returns A tuple with the state and a function to set the state optimistically.
 */
export function useOptimistic<T>(
  initialValue: T,
  updater: (currentState: T, newState: T) => T,
): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(initialValue);
  const [tempState, setTempState] = useState<T>(initialValue);

  const setOptimisticState = (newState: T): void => {
    setTempState(newState);
    try {
      const updatedState = updater(state, newState);
      setState(updatedState);
    } catch (error) {
      MixpanelFront.getInstance().track(
        MontioringErrorTypes.USE_OPTIMISTIC_ERROR,
        { error: error },
      );
      setTempState(state);
    }
  };

  useEffect(() => {
    setTempState(state);
  }, [state]);

  return [tempState, setOptimisticState];
}

export default useOptimistic;
