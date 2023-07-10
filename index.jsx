import { createRoot } from "react-dom/client";
import App from "./components/App";

// import CSS variables

const strokeWidth = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--stroke-width")
);
const unit = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--unit")
);
const gap = parseFloat(
  getComputedStyle(document.documentElement).getPropertyValue("--gap")
);

const colors = {
  white: getComputedStyle(document.documentElement).getPropertyValue("--white"),
  offwhite: getComputedStyle(document.documentElement).getPropertyValue(
    "--offwhite"
  ),
  lightgray: getComputedStyle(document.documentElement).getPropertyValue(
    "--lightgray"
  ),
  primary: getComputedStyle(document.documentElement).getPropertyValue(
    "--primary"
  ),
  bglightgray: getComputedStyle(document.documentElement).getPropertyValue(
  "--bg-lightgray"
),
};

createRoot(document.querySelector(".root")).render(
  <App strokeWidth={strokeWidth} colors={colors} unit={unit} gap={gap} />
);
