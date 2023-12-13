const NewLine: React.FC<{ text: string }> = ({ text }) => {
  return (
    <>
      <p className="text-lg font-semibold text-white">Try: </p>
      <p className=" text-base text-green-200 ">{'"' + text + '"'}</p>
    </>
  );
};

export default NewLine;
