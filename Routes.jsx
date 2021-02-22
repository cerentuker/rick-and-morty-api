import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./src/containers/HomePage";
import LoginForm from "./src/components/LoginForm";

export default function Routes() {

  return (
    userName ? <div>ALO</div> :
      (< Switch >
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
      </Switch >)
  );
}
