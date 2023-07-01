/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import isolineMaps from "./isolineMaps";

export default function IsolineMap(props) {
  let viewbox = {
    x: props.isolineAttributes.width,
    y: props.isolineAttributes.height + props.strokeWidth * 2,
  };
  let scale = props.size.width >= 720 ? 1.48 : 1.9 ;
  let origin = {
    x: (viewbox.x * scale - viewbox.x) / 2,
    y: (viewbox.y * scale - viewbox.y) / 2,
  };
  let strokeWidth = props.strokeWidth;
  let white = props.colors.white;
  let lightgray = props.colors.lightgray;

  return (
    <motion.div
      className="main_isoline-map"
      animate={{
        height: props.isolineAttributes.height,
        width: props.isolineAttributes.width,
        y: props.isolineAttributes.y,
      }}
      transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
    >
      <motion.svg
        animate={{
          viewBox: `${origin.x} 
      ${origin.y} 
      ${props.isolineAttributes.width} 
      ${viewbox.y}`,
        }}
        transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
        version="1.1"
        id="isoline-map"
        viewBox={`${origin.x} 
          ${origin.y} 
          ${viewbox.x} 
          ${viewbox.y}`}
      >
        <pattern
          x="0"
          y="0"
          width={12 / scale}
          height={12 / scale}
          patternUnits="userSpaceOnUse"
          id="dots"
          viewBox="0 -16 16 16"
          overflow="visible"
        >
          <g>
            <rect x="0" y="-16" fill={lightgray} width="16" height="16" />
            <circle fill={white} cx="3.5" cy="-12.5" r={strokeWidth * 1.5} />
            <circle fill={white} cx="11.5" cy="-4.5" r={strokeWidth * 1.5} />
          </g>
        </pattern>
        <g>
          {isolineMaps[0].map((isoline, index) => (
            // index === 16 &&
            <motion.path
              key={`isoline${index}`}
              fill={isoline.p ? "url(#dots)" : lightgray}
              stroke={white}
              strokeWidth={strokeWidth / scale}
              transform={`scale(${scale}), translate(0,${32})`}
              animate={{
                // stroke: ["#FF0000","#00FF00","#0000FF","#000000",{white},"#888888"],
                d: [
                  isolineMaps[0][index].d,
                  isolineMaps[1][index].d,
                  isolineMaps[2][index].d,
                  isolineMaps[1][index].d,
                  isolineMaps[0][index].d,
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 10 /*, ease: "linear"*/,
              }}
            />
          ))}
        </g>
      </motion.svg>
    </motion.div>
  );
}
