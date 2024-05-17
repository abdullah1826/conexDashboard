import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { I18nextProvider } from "react-i18next"; // Import I18nextProvider
import i18next from "./i18next.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </Provider>
  </>
);
