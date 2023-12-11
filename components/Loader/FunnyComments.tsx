"user client";
import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";

type TextDisplayProps = {
  text: string[];
};

function FunnyComments({ text }: TextDisplayProps) {
  const [currentLine, setCurrentLine] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (elapsedTime >= 8) {
      setCurrentLine((line) => (line + 1) % text.length);
      setElapsedTime(0);
    }
  }, [elapsedTime, text]);

  return (
    <m.div
      key={currentLine} // Add key prop
      initial={{ opacity: 0, y: "20%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
      exit={{ opacity: 0, y: "20%" }}
      className="whitespace-no-wrap pt-10 text-lg text-black dark:text-white md:text-xl"
    >
      {text[currentLine]}
    </m.div>
  );
}

export default FunnyComments;
