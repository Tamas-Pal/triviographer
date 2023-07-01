/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
export default function GlobeWireframe(props) {
  let wireframeY = (() => {
    if (props.size.width > 720) {
      return getComputedStyle(document.documentElement).getPropertyValue(
        "--wireframe-y"
      );
    }/* else if (props.size.width <= 720) {
      let wireframeYSplit = getComputedStyle(document.documentElement)
        .getPropertyValue("--wireframe-y")
        .split(" ");
      return (
        wireframeYSplit[6] -
        wireframeYSplit[8] -
        wireframeYSplit[10] -
        wireframeYSplit[12] * wireframeYSplit[14] -
        wireframeYSplit[23]
      );
    }*/
  })()
  let strokeWidth = props.strokeWidth;
  let white = props.colors.white;
  let lightgray = props.colors.lightgray;
  //let bglightgray = props.colors.bglightgray;
  //let primary = props.colors.primary;
  let offwhite = props.colors.offwhite;
  console.log(wireframeY, props.unit);
  let viewbox = { x: 416, y: wireframeY * props.unit };
  let origo = { x: viewbox.x / 2, y: viewbox.y / 2 };

  let gridColor = white;
  let routeColor = offwhite;
  let routeScale = 1.2;

  const circles = [];
  const lines = [];

  for (let i = 1; i <= 10; i++) {
    circles.push(
      <circle
        key={`circle${i}`}
        fill="none"
        stroke={gridColor}
        strokeWidth={strokeWidth * 1}
        cx={origo.x}
        cy={origo.y}
        r={i * 50}
      />
    );
  }
  for (let i = 1; i <= 36; i++) {
    lines.push(
      <line
        key={`line${i}`}
        fill="none"
        stroke={gridColor}
        strokeWidth={strokeWidth * 1}
        x1="-500"
        y1="0"
        x2="500"
        y2="0"
        transform={`translate(${origo.x}, ${origo.y}), rotate(${i * 10})`}
      />
    );
  }

  return (
    <div className="globe-wireframe">
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox={`0 0 ${viewbox.x} ${viewbox.y}`}
        xmlSpace="preserve"
      >
        <filter id="blur">
          <feGaussianBlur stdDeviation="48" />
        </filter>
        <g>
          <g>
            <rect
              x="0"
              y="0"
              fill={lightgray}
              width={viewbox.x}
              height={viewbox.y}
            />
            <g>
              <g
                transform={`translate(-16,732), rotate(${-90}), scale(${routeScale})`}
              >
                <motion.path
                  key={`path1`}
                  fill="none"
                  stroke={routeColor}
                  strokeWidth={(strokeWidth * 1.5) / routeScale}
                  animate={{ strokeDashoffset: ["0%", "10%", "0%"] }}
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  transition={{
                    repeat: Infinity,
                    duration: 28,
                    // ease: "ease-in-out",
                  }}
                  d="M180.77 1C180.77 1 184 36.94 166.33 56C101.63 104.22 202.99 185.2 129.99 211.38C104.28 227.03 121 247.78 91.29 266.71C61.81 285.49 57.9 336.96 51.57 381H498.71C498.71 381 490.15 363.18 456.42 336.85C406.66 298 457.83 239.81 467.5 203.38C476.32 170.13 443.02 125.67 468.98 83.99C486.67 55.6 498.28 30.45 498.28 1H180.77Z"
                />
                <path
                  key={`path2`}
                  fill="none"
                  stroke={routeColor}
                  strokeWidth={(strokeWidth * 2) / routeScale}
                  d="M236.14 1C236.14 1 230.26 36.94 200.71 70C162.9 112.32 189.71 189.2 151 215.38C127.86 231.03 131.48 326.64 104.81 306.74C68.58 279.7 78.54 343.22 94.71 380.99H350.33C350.33 380.99 378.65 359.46 389.38 304.8C395.28 274.71 394.52 213.68 433 201.55S422.94 123.27 450.14 83.98C467.45 58.98 464.62 28.66 464.62 0.99H236.14Z"
                />
                <motion.path
                  key={`path3`}
                  fill="none"
                  stroke={routeColor}
                  strokeWidth={(strokeWidth * 1.5) / routeScale}
                  animate={{ strokeDashoffset: ["0%", "10%", "0%"] }}
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  transition={{
                    repeat: Infinity,
                    duration: 32,
                    //  ease: "ease-in-out",
                  }}
                  d="M402.71 1C389.33 36.94 409.33 50.03 380.13 96.59C360.85 127.34 378.3 169.2 365.48 197.35C355.02 220.32 339.21 239.15 326.42 237.69C291.75 233.75 342.25 172.15 335.56 139.64C328.87 107.13 328.43 65.55 343.27 0.99H402.71Z"
                />
                <path
                  key={`path4`}
                  fill="none"
                  stroke={routeColor}
                  strokeWidth={(strokeWidth * 2) / routeScale}
                  d="M418.29 1C411.26 36.94 436 53.11 395.43 97.73C366.73 129.29 402.72 170.22 365.57 227.53C345.89 257.89 373 297.96 348.43 317.56C323.86 337.16 317.92 275.54 297.57 236.97C275.74 195.58 322.64 165.26 319.57 127.95C316.09 85.56 299 50.03 322.29 1H418.29Z"
                />
                <motion.path
                  key={`path5`}
                  fill="none"
                  stroke={routeColor}
                  strokeWidth={(strokeWidth * 1.5) / routeScale}
                  animate={{ strokeDashoffset: ["0%", "10%", "0%"] }}
                  strokeDasharray="8, 6"
                  strokeLinecap="round"
                  d="M276.99 381C276.99 381 261.73 274.49 241.57 256.12C228.43 244.15 257.2 185.28 226.56 198.76C188.05 215.69 184.85 256.68 168.43 272.82C152.85 288.14 184.72 339.26 163 346.52S134.71 381 134.71 381H276.99Z"
                  transition={{
                    repeat: Infinity,
                    duration: 28,
                  }}
                />
              </g>
              <g>{circles}</g>
              <g>{lines}</g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
