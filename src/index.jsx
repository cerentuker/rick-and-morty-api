import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./pages/App.jsx";

const HotReloadableApp = hot(module)(App);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <HotReloadableApp />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
