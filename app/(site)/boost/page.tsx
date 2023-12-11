import ApiLoader from "@/components/Loader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CVBoost | Boost",
  description: "This is boost for CVBoost",
};

const BoostPage = () => {
  return (
    <div className="h-[90vh] w-full">
      <div className="flex items-center justify-center">
        <ApiLoader></ApiLoader>
      </div>
    </div>
  );
};

export default BoostPage;
