/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import isolineMaps from "./isolineMaps";

export default function IsolineMap(props) {
  
  // SVG Parameters
  
  let strokeWidth = props.strokeWidth;
  let white = props.colors.white;
  let lightgray = props.colors.lightgray;

  let viewbox, scale, rotate, translateX, translateY;
  viewbox = {
    x: props.isolineAttributes.width,
    y: props.isolineAttributes.height + props.strokeWidth * 6,
  };
  scale = 2.05;
  rotate = 0;
  translateX = -8;
  translateY = 88;
  let origin = {
    x: (viewbox.x * scale - viewbox.x) / 2,
    y: (viewbox.y * scale - viewbox.y) / 2,
  };

  // Layout Transition

  // default transition
  const [layoutTransition, setLayoutTransition] = useState({
    delay: 0.5,
    duration: 0.5,
    ease: "linear",
  });
  
  // turn off transition when layout changes
  useEffect(() => {
    setLayoutTransition({ delay: 0.0, duration: 0.0, ease: "linear" });
  }, [props.isLargeSize]);

  return (

    // Wrapper
    
    <motion.div
      className="main_isoline-map"
      animate={{
        height: props.isolineAttributes.height,
        width: props.isolineAttributes.width,
        y: props.isolineAttributes.y,
      }}
      transition={layoutTransition}

  // turns back default transition values
      onAnimationComplete={() => {
        setLayoutTransition({
          delay: 0.5,
          duration: 0.5,
          ease: "linear",
        });
      }}
    >

      {/* SVG */}

      <motion.svg
        animate={{
          viewBox: `${origin.x} 
      ${origin.y} 
      ${props.isolineAttributes.width} 
      ${viewbox.y}`,
        }}
        transition={layoutTransition}
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
        
        {/* Animating lines */}
    
        <g>
          {isolineMaps[0].map((isoline, index) => (
            <motion.path
              key={`isoline${index}`}
              fill={isoline.p ? "url(#dots)" : lightgray}
              stroke={white}
              strokeWidth={strokeWidth / scale}
              transform={`rotate(${rotate}) scale(${scale}) translate(${translateX},${translateY})`}
              animate={{
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
                duration: 10,
              }}
            />
          ))}
        </g>
      </motion.svg>
    </motion.div>
  );
}
