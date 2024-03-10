import { MixpanelBack } from "@/services/mixpanelBack";
import { MonitoringErrorTypes } from "@/types/monitoring/errors";

export const trackError = (
  errorType: MonitoringErrorTypes,
  data: object = {},
  id?: string,
) => {
  if (id) {
    data["distinct_id"] = id;
  }
  MixpanelBack.getInstance().track(errorType, data);
};
