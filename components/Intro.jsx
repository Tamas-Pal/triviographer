/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
export const Intro = (props) => {
    const letters = "Triviographer".split("");
  const [showLoad, setShowLoad] = useState({ text: true, background: true });
  return (
    showLoad.background && (
      <div className="loading-wrap">
        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            setShowLoad((prevState) => ({ ...prevState, background: false }));
          }}
        >
          {showLoad.text && (
            <motion.div
              exit={{ rotateZ: -90 }}
              transition={{ delay: 0.5, duration: 0.75, ease: "linear" }}
              className="loading"
            >
              <AnimatePresence
                onExitComplete={() => {
                  setShowLoad((prevState) => ({ ...prevState, text: false }));
                }}
              >
                {props.state === "setup" && (
                  <motion.h1
                    exit={{ opacity: 0 }}
                    transition={{ delay: 3, duration: 0.5 }}
                  >
                    <span className="loading-text">{`Welcome to`}</span>
                    <br />
                    {letters.map((letter, index) => {
                      return (
                        <motion.span
                          className={`loading-letter ${index+1 === letters.length ? 'last-letter' : ''}`}
                          key={letter}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                            delay: index * 0.05,
                            ease: (val) => Math.floor(val),
                          }}
                        >
                          {letter}
                        </motion.span>
                      );
                    })}
                    <br />
                    <span className="loading-text">
                      {`A Geography Quiz Game`}
                    </span>
                  </motion.h1>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  );
};
