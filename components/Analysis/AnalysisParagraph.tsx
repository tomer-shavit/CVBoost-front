const AnalysisParagraph: React.FC<{ text: string }> = ({ text }) => {
  return (
    <p className="mb-6 text-center text-neutral-200 md:text-left ">{text}</p>
  );
};

export default AnalysisParagraph;
