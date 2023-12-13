import { BiTargetLock } from "react-icons/bi";
import { FaBullseye, FaTags } from "react-icons/fa";
import { MdStar } from "react-icons/md";

type IconMapType = {
  [key: string]: JSX.Element;
};

const iconMap: IconMapType = {
  Clarity: (
    <span className="mr-2 mt-1 inline-block">
      <BiTargetLock color="#629BE2" />
    </span>
  ),
  Relevance: (
    <span className="mr-2 mt-1 inline-block">
      <FaBullseye color="#50C980" />
    </span>
  ),
  Achievements: (
    <span className="mr-2 inline-block">
      <MdStar color="#DDBA2B" />
    </span>
  ),
  Keywords: (
    <span className="mr-2 mt-2 inline-block">
      <FaTags color="#CF78E1" />
    </span>
  ),
};

const AnalysisSubTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <h4 className="mb-2 flex items-center justify-center text-2xl font-bold text-neutral-100 md:justify-start">
      {title}
      <span className="ml-2 mt-2">{iconMap[title]}</span>
    </h4>
  );
};

export default AnalysisSubTitle;
