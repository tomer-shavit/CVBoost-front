import { motion as m } from "framer-motion";

export const InAndUpAnimation: React.FC<{
  children: React.ReactNode;
  duration?: number;
}> = ({ children, duration = 0.75 }) => {
  return (
    <m.div
      initial={{ opacity: 0, y: "15%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: duration, ease: "easeOut" }}
      exit={{ opacity: 0, y: "15%" }}
    >
      {children}
    </m.div>
  );
};
