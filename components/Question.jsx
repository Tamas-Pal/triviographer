import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* eslint-disable react/prop-types */
const Question = forwardRef(function Question(props, ref) {
  
  // handler to only update question when the previous had animated out / unmounted
  const questionExitComplete = () => {
    props.setCurrentContent((prevState) => ({
      ...prevState,
      q: props.challenge.q,
    }));
  };

  return (
    <motion.div
      className="main_question-wrap"
      layout
      transition={{ duration: 0.15, delay: 0.25 }}
    >
      <div className="h1-wrap">
        <AnimatePresence mode="wait" onExitComplete={questionExitComplete}>
          {props.currentContent.q === props.challenge.q && (
            <motion.h1
              ref={ref}
              key={props.challenge.q}
              className="main_question"
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ delay: 0.25, ease: "linear" }}
            >
              {props.currentContent.q}
            </motion.h1>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

export default Question;
