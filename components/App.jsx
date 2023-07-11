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
  // Game States, functions

  // function to rearrange answers
  const randomSort = () => {
    return [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  };

  const [challenge, setChallenge] = useState({
    q: "",
    a: ["0", "1", "2", "3"],
    order: randomSort(),
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
        // replace special characters
        const question = replacer(data.results[0].question);
        const answers = data.results[0].incorrect_answers.map((answer) =>
          replacer(answer)
        );
        answers.push(replacer(data.results[0].correct_answer));

        // compile challenge
        setChallenge((prevState) => ({
          ...prevState,
          q: question,
          a: answers,
          order: randomSort(),
          state: "active",
        }));
      });
  }, [score.questionsTotal]);

  //LAYOUT States

  const size = useWindowSize();
  const [isLargeSize, setIsLargeSize] = useState(
    size.width > 720 ? true : false
  );
  const elementsRef = useRef({});

  // state to create buffer for waiting for previous questions & answers to animate out
  const [currentContent, setCurrentContent] = useState({
    q: challenge.q,
    a: challenge.a,
  });

  // update SVG components
  const [wireframeAttributes, setWireframeAttributes] = useState({
    linesRotation: 0,
  });
  const [isolineAttributes, setIsolineAttributes] = useState({
    width: isLargeSize ? 576 : 360,
    height: isLargeSize ? 424 : 488,
    y: 0,
  });

  // Calculate New Layout Sizing for Each Challenge
  useLayoutEffect(() => {
    setIsLargeSize(size.width > 720 ? true : false);
    if (currentContent.q === challenge.q && currentContent.a === challenge.a) {
      // functions for layout specific calculations (answers height & intermediary isoline map dimensions)
      const desktopResize = () => {
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
        let isolineDimensions = {
          width: 440,
          height:
            (questionHeight + answersHeight + props.gap * 2) * props.unit -
            props.unit * 8,
          y: props.unit * 8,
        };
        return [answersHeight, isolineDimensions];
      };
      const mobileResize = () => {
        let answersHeight =
          Math.ceil(
            (elementsRef.current.answers.children[0].offsetHeight +
              elementsRef.current.answers.children[1].offsetHeight +
              elementsRef.current.answers.children[2].offsetHeight +
              elementsRef.current.answers.children[3].offsetHeight) /
              props.unit
          ) +
          1.75 * props.unit;
        let isolineDimensions = {
          width: 228,
          height:
            Math.ceil(questionHeight + answersHeight + 6) * props.unit - 84,
          y: 84,
        };
        return [answersHeight, isolineDimensions];
      };

      // adjust grid height
      const paddingTop = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--padding-top"
        )
      );
      document.documentElement.style.setProperty(
        "--grid-y",
        Math.floor(size.height / props.unit) - paddingTop
      );

      // question height
      let questionOffsetHeight = elementsRef.current.question.offsetHeight;
      let questionHeight =
        Math.ceil(questionOffsetHeight / props.unit) + props.unit * 0.5;
      document.documentElement.style.setProperty(
        "--question-y",
        questionHeight
      );

      // answers and isoline dimensions
      let [answersHeight, isolineDimensions] = isLargeSize
        ? desktopResize()
        : mobileResize();
      document.documentElement.style.setProperty("--answers-y", answersHeight);
      setIsolineAttributes({
        ...isolineDimensions,
      });

      // globe wireframe
      setWireframeAttributes((prevState) => ({
        linesRotation: prevState.linesRotation + 10,
      }));

      // end keyframe of layout transition
      setTimeout(() => {
        let isolineWidth, gapSize;
        if (isLargeSize) {
          isolineWidth = 576;
          gapSize = 2;
        } else {
          isolineWidth = 288;
          gapSize = 1.5;
        }

        setIsolineAttributes(() => ({
          height:
            (questionHeight + answersHeight + props.gap * gapSize) * props.unit,
          width: isolineWidth,
          y: 0,
        }));
      }, 1000);
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
    setChallenge((prevState) => ({
      ...prevState,
      state: "nextClicked",
    }));
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
        {isLargeSize && (
          <GlobeWireframe
            strokeWidth={props.strokeWidth}
            colors={props.colors}
            unit={props.unit}
            isLargeSize={isLargeSize}
            linesRotation={wireframeAttributes.linesRotation}
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
          handleNewQuestion={
            challenge.state != "nextClicked" && handleNewQuestion
          }
          setIsolineAttributes={setIsolineAttributes}
          currentContent={currentContent}
          setCurrentContent={setCurrentContent}
        />
        <motion.div
          className="main_frame"
          layout
          transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
        ></motion.div>

        <motion.div
          className="main_container"
          layout
          transition={{ duration: 0.5, delay: 0.5, ease: "linear" }}
        ></motion.div>

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
          isLargeSize={isLargeSize}
        />
        <IsolineMap
          strokeWidth={props.strokeWidth}
          colors={props.colors}
          q={challenge.q}
          isolineAttributes={isolineAttributes}
          isLargeSize={isLargeSize}
        />
      </div>
    </>
  );
}
