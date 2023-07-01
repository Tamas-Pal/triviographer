/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
export default function Button(props) {
  // console.log(props);
  const buttonState =
    props.state === "active"
      ? "active"
      : props.id === 3 && props.clicked === 3
      ? "correct-clicked"
      : props.id === 3 && !props.clicked != props.id
      ? "correct-not-clicked"
      : props.id != 3 && props.clicked === props.id
      ? "incorrect-clicked"
      : "incorrect-not-clicked";
  return (
    <motion.div
      key={props.answerText}
      className={`main_answer-wrap ${buttonState}`}
      initial={{ opacity: 0, transition: { delay: 0.0, duration: 0.125 } }}
      animate={{ opacity: 1, transition: { delay: 1.5, duration: 0.25 } }}
      exit={{ opacity: 0, transition: { delay: 0.0, duration: 0.125 } }}
    >
      <motion.button
        id={props.id}
        className={`main_answer ${buttonState}`}
        onClick={props.handleAnswer}
      >
        {/* <motion.span key={props.text} initial={{ opacity: 0, transition: { delay: .75 } }}
      animate={{ opacity: 1, transition: { delay: .75 } }}
      exit={{ opacity: 0, transition: { delay: .0, duration: .25 } }}> */}
        {props.answerText}
        {/* </motion.span> */}
      </motion.button>
    </motion.div>
  );
}
