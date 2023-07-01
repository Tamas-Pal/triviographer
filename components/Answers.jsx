/* eslint-disable react/prop-types */
import { AnimatePresence } from "framer-motion";
import Button from "./Button";
import { forwardRef } from "react";

const Answers = forwardRef(function Answers(props, ref) {
 

  const answersExitComplete = () => {
     props.setCurrentContent((prevState) => ({
      ...prevState,
      a: props.challenge.a,
    }));
  };

  return (
    <div className="main_answers" ref={ref}>
      <AnimatePresence mode="wait" onExitComplete={answersExitComplete}>
        {props.challenge.a.map((answer, index) => {
          let answerText =
            props.currentContent.a[props.challenge.reorder[index]];
          //  console.log(answerText);
          return (
            answerText ===
              props.challenge.a[props.challenge.reorder[index]] && (
              <Button
                id={parseInt(props.challenge.reorder[index])}
                key={answerText}
                index={index}
                handleAnswer={props.handleAnswer}
                answerText={answerText}
                state={props.challenge.state}
                clicked={props.challenge.clicked}
              />
            )
          );
        })}
      </AnimatePresence>
    </div>
  );
});

export default Answers;
