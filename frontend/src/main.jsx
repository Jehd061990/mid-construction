import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

import { FloorPlanContextProvider } from "./context/FloorPlanContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FloorPlanContextProvider>
      <App />
      <Toaster />
    </FloorPlanContextProvider>
  </StrictMode>
);
