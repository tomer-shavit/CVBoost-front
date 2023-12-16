const SubCard: React.FC<{
  children: React.ReactNode;
  last?: boolean;
  className?: string;
}> = ({ children, last = false, className }) => {
  return (
    <div
      className={`block rounded-lg ${className}  ${
        last ? "" : "mb-8"
      } bg-gray-100 p-4 shadow-md dark:bg-blackho`}
    >
      {children}
    </div>
  );
};

export default SubCard;
