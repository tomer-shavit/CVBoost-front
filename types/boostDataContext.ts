import { BoostResponse } from "./apiCalls";

export interface BoostDataContextType {
  boostData: BoostResponse;
  setBoostData: (data: BoostResponse) => void;
}
