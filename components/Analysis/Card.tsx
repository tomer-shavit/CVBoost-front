const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full flex-col justify-center shadow-lg ">
      <div className="scrollbar-thin scroll  overflow-y-auto rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-strokedark dark:bg-blacksection">
        {children}
      </div>
    </div>
  );
};

export default Card;
