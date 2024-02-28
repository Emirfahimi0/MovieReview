import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { MovieProvider as GlobalProvider } from "./context";
import { App } from "./App.tsx";
import ReactGA from "react-ga4";
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

ReactGA.initialize([
  {
    trackingId: "G-GQMSLTD3XR",
  },
]);

ReactGA.send({ hitType: "pageview", page: "/my-path", title: "Main" });

// Send a custom event
ReactGA.event({
  category: "your category",
  action: "your action",
  label: "your label", // optional
  value: 99, // optional, must be a number
  nonInteraction: true, // optional, true/false
  transport: "xhr", // optional, beacon/xhr/image
});
