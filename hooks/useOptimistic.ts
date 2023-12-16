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

  // Function to set temporary state optimistically
  const setOptimisticState = (newState: T): void => {
    setTempState(newState);
    try {
      // Update the actual state with the updater function
      const updatedState = updater(state, newState);
      setState(updatedState);
    } catch (error) {
      // Revert to the previous state in case of error
      console.error(error);
      setTempState(state);
    }
  };

  // Effect to synchronize tempState with the actual state
  useEffect(() => {
    setTempState(state);
  }, [state]);

  return [tempState, setOptimisticState];
}

export default useOptimistic;
