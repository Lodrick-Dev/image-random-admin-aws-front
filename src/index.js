import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { DynamicContextProvider } from "./context/DynamicContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DynamicContextProvider>
        <App />
      </DynamicContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
