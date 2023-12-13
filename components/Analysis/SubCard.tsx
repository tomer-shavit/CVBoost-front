const SubCard: React.FC<{ children: React.ReactNode; last?: boolean }> = ({
  children,
  last = false,
}) => {
  return (
    <div className={`block rounded-lg ${last ? "" : "mb-8"} bg-slate-600 p-4`}>
      {children}
    </div>
  );
};

export default SubCard;
