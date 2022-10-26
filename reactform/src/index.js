import React from "react";
import ReactDOM from "react-dom/client";
import Table from "./Components/Table";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Table />
  </Provider>
);
