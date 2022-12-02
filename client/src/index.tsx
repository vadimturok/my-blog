import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import Layout from "./components/layout/Layout";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Loader from "./components/loader/Loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <Suspense fallback={<Loader />}>
          <App />
        </Suspense>
      </Layout>
    </Provider>
  </BrowserRouter>
);
