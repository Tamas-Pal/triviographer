import Scale from "./scale";
import { motion } from "framer-motion";

/* eslint-disable react/prop-types */
export default function Score(props) {
  let score = props.score;
  return (
    <motion.div
      className="score"
      layout
      transition={{
        duration: 0.5,
        delay: 0.5,
        type: "spring",
        stiffness: 50,
      }}
    >
      {props.size.width > 720 && <Scale
      // strokeWidth={props.strokeWidth} colors={props.colors}
      />}
      <p className="score_ratio">
        {`${score.points}`} <span className="score_ratio_division">/</span>{" "}
        {`${score.questionsTotal} `}
      </p>
      <div className="score_percentage">    
      <p className="percentage_number">{`${parseFloat(
        (score.points / score.questionsTotal) * 100
      ).toFixed(2)}%`}</p>
      <div className="percentage_bar">
        <motion.div
          className="score_bar_fill"
          // style={{ width: (128 * score.points) / score.questionsTotal }}
          animate={{ width: (128 * score.points) / score.questionsTotal }}
          transition={{ /*type: "spring", stiffness: 150,*/ duration: 1 }}
        ></motion.div>
      </div>
      </div>
    </motion.div>
  );
}
