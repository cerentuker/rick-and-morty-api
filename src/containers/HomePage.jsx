import React, { useState } from "react";
import { useAppContext } from "../libs/contextLib";
import "./HomePage.css";
import LoginForm from "../components/LoginForm.jsx"
import Provider from '../api/Provider';
import Dashboard from "./Dashboard";

export default function Home() {
  const { userName } = useAppContext();

  return (
    userName ?
      <div>
        <Provider>
          <Dashboard />
        </Provider>
      </div> :
      <LoginForm />
  );
}
