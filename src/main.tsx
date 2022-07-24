import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { handleColors } from "./utils/funcs";
import { LangContextProvider } from "./utils/hooks";

setInterval(handleColors, 20);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LangContextProvider>
      <App />
    </LangContextProvider>
  </React.StrictMode>
);
