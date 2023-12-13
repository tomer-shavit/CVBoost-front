const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="scrollbar-thin scroll  overflow-y-auto rounded-lg bg-slate-700 p-6 shadow-lg ">
        {children}
      </div>
    </div>
  );
};

export default Card;
