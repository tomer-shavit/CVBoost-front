import { MixpanelBack } from "@/services/mixpanelBack";
import { PageNames } from "@/types/monitoring/pageNames";

export const serverPageView = (
  pageName: PageNames,
  data: object = {},
  id?: string,
) => {
  if (id) {
    data["distinct_id"] = id;
  }
  MixpanelBack.getInstance().track(`PageView::${pageName}`, data);
};
