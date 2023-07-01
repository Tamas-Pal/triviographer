import { AnimatePresence } from "framer-motion";
import { ResultButton } from "./ResultButton";

/* eslint-disable react/prop-types */
export default function Next(props) {
  //let showNext
  /* const nextExitComplete = () => {
    props.setCurrentContent((prevState) => ({
      ...prevState,
      nextButtonState: false,
    }));
  };*/
  /*if (props.state === "win" || props.state === "lose") {
    props.setCurrentContent((prevState) => ({
      ...prevState,
      nextButtonState:
        props.state === "win" || props.state === "lose" ? true : false,
    }));
  }*/
  //console.log(props.currentContent.nextButtonState);
  let showNext = props.state === "win" || props.state === "lose" ? true : false;
  return (
    <AnimatePresence /*onExitComplete={nextExitComplete}*/>
      {showNext && (
        <div className="result">
          <ResultButton
            //key={props.answer}
            handleNewQuestion={props.handleNewQuestion}
            answer={props.answer}
            state={props.state}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
