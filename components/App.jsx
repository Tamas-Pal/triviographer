/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import IsolineMap from "./IsolineMap";
import GlobeWireframe from "./GlobeWireframe";
import Question from "./Question";
import Answers from "./Answers";
import Next from "./Next";
import Score from "./Score";
import replacer from "../functions/replacer";
import { Intro } from "./Intro";
import { useWindowSize } from "@uidotdev/usehooks";

export default function App(props) {
  // GAME States

  const randomSort = () => {
    return [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  };

  const [challenge, setChallenge] = useState({
    q: "",
    a: ["0", "1", "2", "3"],
    reorder: randomSort(),
    state: "setup",
    clicked: -1,
  });

  const [score, setScore] = useState({
    points: 0,
    questionsTotal: 1,
  });

  //  API Request

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&category=22&type=multiple")
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.results[0]);
        const question = replacer(data.results[0].question);
        const answers = data.results[0].incorrect_answers.map((answer) =>
          replacer(answer)
        );
        answers.push(replacer(data.results[0].correct_answer));
        setChallenge((prevState) => ({
          ...prevState,
          //q:"LLANFAIR&SHY;PWLLGWYNGYLL&SHY;GOGERY&SHY;CHWYRN&SHY;DROBWLL&SHY;LLAN&SHY;TYSILIO&SHY;GOGO&SHY;GOCH",
          q: question,
          a: answers,
          reorder: randomSort(),
          state: "active",
        }));
      });
  }, [score.questionsTotal]);

  //LAYOUT States

  const size = useWindowSize();
  const elementsRef = useRef({});
  const [currentContent, setCurrentContent] = useState({
    q: challenge.q,
    a: challenge.a,
  });
  const [isolineAttributes, setIsolineAttributes] = useState({
    width: size.width > 720 ? 576 : 360,
    height: size.width > 720 ? 424 : 488,
    y: 0,
  });

  useLayoutEffect(() => {
    if (currentContent.q === challenge.q && currentContent.a === challenge.a) {
      document.documentElement.style.setProperty(
        "--grid-y",
        Math.floor(size.height / props.unit)
      );
      console.log(Math.floor(size.height / props.unit));
      // compute question height
      let questionOffsetHeight = elementsRef.current.question.offsetHeight;
      let questionHeight =
        Math.ceil(questionOffsetHeight / props.unit) + props.unit * 0.5;
      document.documentElement.style.setProperty(
        "--question-y",
        questionHeight
      );

      if (size.width > 720) {
        let answersLeftHeight =
          elementsRef.current.answers.children[0].offsetHeight +
          elementsRef.current.answers.children[1].offsetHeight;
        let answersRightHeight =
          elementsRef.current.answers.children[2].offsetHeight +
          elementsRef.current.answers.children[3].offsetHeight;
        let answersHeight =
          Math.ceil(
            Math.max(answersLeftHeight, answersRightHeight) / props.unit
          ) +
          1.5 * props.unit;

        document.documentElement.style.setProperty(
          "--answers-y",
          answersHeight
        );

        setIsolineAttributes({
          width: 440,
          height:
            (questionHeight + answersHeight + props.gap * 2) * props.unit -
            props.unit * 8,
          y: props.unit * 8,
        });
        setTimeout(() => {
          setIsolineAttributes(() => ({
            height:
              (questionHeight + answersHeight + props.gap * 2) * props.unit,
            width: 576,
            y: 0,
          }));
        }, 1000);
      } else if (size.width <= 720) {
        let answersHeight =
          Math.ceil(
            (elementsRef.current.answers.children[0].offsetHeight +
              elementsRef.current.answers.children[1].offsetHeight +
              elementsRef.current.answers.children[2].offsetHeight +
              elementsRef.current.answers.children[3].offsetHeight) /
              props.unit
          ) +
          1.75 * props.unit;

        document.documentElement.style.setProperty(
          "--answers-y",
          answersHeight
        );
        setIsolineAttributes({
          width: 328,
          height: Math.ceil(questionHeight + answersHeight + 6) * props.unit,
          y: 0,
        });
      }
    }
  }, [currentContent, size]);

  // Click Events

  function handleAnswer(event) {
    event.preventDefault();
    if (challenge.state === "active") {
      const result = parseInt(event.target.id) === 3 ? "win" : "lose";
      setChallenge((prevState) => ({
        ...prevState,
        state: result,
        clicked: parseInt(event.target.id),
      }));
      setScore((prevState) => ({
        ...prevState,
        points: result === "win" ? prevState.points + 1 : prevState.points,
      }));
    }
  }

  function handleNewQuestion() {
    setScore((prevState) => ({
      points: prevState.points,
      questionsTotal: prevState.questionsTotal + 1,
    }));
  }

  return (
    <>
      <Intro state={challenge.state} />
      <div className="deep-background"></div>
      <div className="game">
        {size.width > 720 && (
          <GlobeWireframe
            strokeWidth={props.strokeWidth}
            colors={props.colors}
            unit={props.unit}
            size={size}
          />
        )}
        <header>
          <div className="heading">
            <div className="heading_divider"></div>
            <h1 className="heading_title">Triviographer</h1>
          </div>
          <h2 className="header_subheader">
            A multiple-choice geography quiz game
          </h2>
        </header>
        <Next
          state={challenge.state}
          answer={challenge.a[3]}
          handleNewQuestion={handleNewQuestion}
          setIsolineAttributes={setIsolineAttributes}
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
        <motion.div
          className="main_frame"
          layout
          transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
        ></motion.div>
        {size.width > 720 && (
          <motion.div
            className="main_container"
            layout
            transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
          ></motion.div>
        )}
        <Question
          challenge={challenge}
          ref={(element) => (elementsRef.current.question = element)}
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
        <Answers
          handleAnswer={handleAnswer}
          challenge={challenge}
          ref={(element) => (elementsRef.current.answers = element)}
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
        <Score
          score={score}
          strokeWidth={props.strokeWidth}
          colors={props.colors}
          size={size}
        />
        <IsolineMap
          strokeWidth={props.strokeWidth}
          colors={props.colors}
          q={challenge.q}
          isolineAttributes={isolineAttributes}
          size={size}
        />
      </div>
    </>
  );
}
