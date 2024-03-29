import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import store from "@/app/store";
import App from "./App.tsx";
import "./index.css";
import { inject } from "@vercel/analytics";

inject();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>
);
