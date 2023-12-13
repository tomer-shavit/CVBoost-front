import { GptApiResponse } from "./apiCalls";

export interface BoostDataContextType {
  boostData: GptApiResponse;
  setBoostData: (data: GptApiResponse) => void;
}
