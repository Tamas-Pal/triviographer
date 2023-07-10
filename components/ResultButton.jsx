/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

// button slides in when question answered, slides out when clicked
export const ResultButton = (props) => {
  let resultText =
    props.state === "win" ? (
      <p className="result_text">
        Well done! Ready for the{" "}
        <span className="result_text_next-question">next question</span>?
      </p>
    ) : (
      <p className="result_text">
        The answer was{" "}
        <span className="result_text_correct-answer">{props.answer}.</span>{" "}
        Ready for the{" "}
        <span className="result_text_next-question">next question</span>?
      </p>
    );

  return (
    <motion.button
      key={props.answer}
      onClick={props.handleNewQuestion}
      initial={{ y: 144, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 144, opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      {resultText}
    </motion.button>
  );
};
