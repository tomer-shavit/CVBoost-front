const SubCard: React.FC<{ children: React.ReactNode; last?: boolean }> = ({
  children,
  last = false,
}) => {
  return (
    <div
      className={`block rounded-lg ${
        last ? "" : "mb-8"
      } bg-gray-100 p-4 shadow-md dark:bg-blackho`}
    >
      {children}
    </div>
  );
};

export default SubCard;
