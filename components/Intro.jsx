/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
export const Intro = (props) => {
  const letters = "Triviographer".split("");

  // state to set presence of elements
  const [showLoad, setShowLoad] = useState({ text: true, background: true });

  return (
    showLoad.background && (
      <div className="intro-wrap">
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
              className="intro"
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
                    className="intro_text-wrap"
                  >
                    <span className="intro_text">{`Welcome to`}</span>
                    <br />
                    {letters.map((letter, index) => {
                      return (
                        <motion.span
                          className={`intro_text_letter ${
                            index + 1 === letters.length ? "last-letter" : ""
                          }`}
                          key={letter + index}
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
                    <span className="intro_text">
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
