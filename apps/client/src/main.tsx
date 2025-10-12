import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";

import store from "./store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Suspense fallback={<div className="spinner" />}>
        <App />
      </Suspense>
    </Provider>
  </StrictMode>
);
