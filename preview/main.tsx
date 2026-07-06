import React from "react";
import { createRoot } from "react-dom/client";

// Real design-system styles: the three theme token files, the brand fonts, and
// the compiled Tailwind utilities the Button uses (regenerate: npm run build:css).
import "../tokens/honey-glazed.css";
import "../tokens/prosciutto.css";
import "../tokens/smoked.css";
import "../tokens/fonts/fonts.css";
import "../dist/hamstack.css";
import "./preview.css";

import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
