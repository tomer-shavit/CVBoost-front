const OldLine: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="mb-4 ">
      <p className="text-lg font-semibold text-black dark:text-white">
        Instead of:{" "}
      </p>
      <p className=" text-base text-red-500 dark:text-red-200 ">
        {'"' + text + '"'}
      </p>
    </div>
  );
};

export default OldLine;
