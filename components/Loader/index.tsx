"use client";
import styles from "./loader.module.scss";
import { motion as m } from "framer-motion";
import FunnyComments from "./FunnyComments";
import { loadingSentences } from "./loadingLines";
import { useEffect, useState } from "react";

const ApiLoader: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    const randomLines = loadingSentences
      .sort(() => Math.random() - 0.5)
      .slice(0, 8);
    setLines(randomLines);
  }, []);
  return (
    <div className="flex w-full justify-center">
      <div className="absolute top-80 flex flex-col items-center justify-center">
        <div className="relative ">
          <m.div
            initial={{ opacity: 0, y: "15%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            exit={{ opacity: 0, y: "15%" }}
            className={`${styles.loader_wrapper}`}
          >
            <div className={`${styles.box_wrap}`}>
              <div className={`${styles.box} ${styles.one}`}></div>
              <div className={`${styles.box} ${styles.two}`}></div>
              <div className={`${styles.box} ${styles.three}`}></div>
              <div className={`${styles.box} ${styles.four}`}></div>
              <div className={`${styles.box} ${styles.five}`}></div>
              <div className={`${styles.box} ${styles.six}`}></div>
            </div>
          </m.div>
        </div>
        <div className="flex w-11/12 justify-center pt-20 text-center">
          <FunnyComments text={lines}></FunnyComments>
        </div>
      </div>
    </div>
  );
};

export default ApiLoader;
