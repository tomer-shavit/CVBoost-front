import { MixpanelBack } from "@/services/mixpanelBack";
import { MontioringErrorTypes } from "@/types/monitoring/errors";

export const trackError = (
  errorType: MontioringErrorTypes,
  data: object = {},
  id?: string,
) => {
  if (id) {
    data["distinct_id"] = id;
  }
  MixpanelBack.getInstance().track(errorType, data);
};
