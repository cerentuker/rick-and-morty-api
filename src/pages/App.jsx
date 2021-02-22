import React, { useState } from "react";
import { AppContext } from "../libs/contextLib";
import './App.css';
import HomePage from "../containers/HomePage"

function App() {
  const [userName, authenticateUser] = useState(false);
  return (
    <div>
      <AppContext.Provider value={{ userName, authenticateUser }}>
        <div className="app-container">
          <HomePage />
        </div >
      </AppContext.Provider >
    </div>
  );
}

export default App;
