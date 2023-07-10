import { AnimatePresence } from "framer-motion";
import { ResultButton } from "./ResultButton";

/* eslint-disable react/prop-types */
export default function Next(props) {
  let showNext = props.state === "win" || props.state === "lose" ? true : false;
  return (
    <AnimatePresence>
      {showNext && (
        <div className="result">
          <ResultButton
            handleNewQuestion={props.handleNewQuestion}
            answer={props.answer}
            state={props.state}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
