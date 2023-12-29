import { MixpanelFront } from "@/services/mixpanelFront";
import { PageNames } from "@/types/monitoring/pageNames";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const usePageView = (pageName: PageNames, data: object = {}) => {
  const { data: session } = useSession();

  useEffect(() => {
    const mixpanel = MixpanelFront.getInstance();
    if (session?.user?.id) {
      mixpanel.identify(session?.user?.id);
    }
    mixpanel.track(`PageView::${pageName}`, data);
    console.log(`PageView::${pageName}`);
  }, [pageName, data]);
};

export default usePageView;
