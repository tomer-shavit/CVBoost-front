import { MixpanelFront } from "@/services/mixpanelFront";
import { PageNames } from "@/types/monitoring/pageNames";
import { useEffect } from "react";

const usePageView = (pageName: PageNames, data: object = {}, id?: string) => {
  useEffect(() => {
    const mixpanel = MixpanelFront.getInstance();
    if (id) {
      mixpanel.identify(id);
    }
    mixpanel.track(`PageView::${pageName}`, data);
    console.log(`PageView::${pageName}`);
  }, [pageName, data, id]);
};

export default usePageView;
