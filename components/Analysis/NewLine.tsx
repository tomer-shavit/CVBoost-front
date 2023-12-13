const NewLine: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <p className="text-lg font-semibold text-black dark:text-white">Try: </p>
      <p className=" text-base text-green-500 dark:text-green-200 ">
        {'"' + text + '"'}
      </p>
    </>
  );
};

export default NewLine;
