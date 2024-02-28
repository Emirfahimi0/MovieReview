import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MovieProvider as GlobalProvider } from "./context";
import { App } from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);
