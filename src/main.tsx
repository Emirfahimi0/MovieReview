import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MovieProvider as GlobalProvider } from "./context";
import { App } from "./App.tsx";
import { ErrorBoundary } from "./layout/";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
