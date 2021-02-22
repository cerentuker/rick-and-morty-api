import React from 'react';
import { useAppContext } from "../libs/contextLib";
import Button from 'react-bootstrap/Button'
import Provider from '../api/Provider'
import Characters from '../components/Characters';

export default function Dashboard() {
  const { userName, authenticateUser } = useAppContext();

  const logoutUser = () => {
    authenticateUser('');
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-nav-container">
        <div className="welcome-message">
          <h1>
            {"Welcome to Rick and Morty Dashboard, " + userName + "!"}
          </h1>
        </div>
        <div className="logout-container">
          <Button className="logout-button" onClick={logoutUser}>Logout</Button>
        </div>
      </div>
      <Provider>
        <Characters />
      </Provider>
    </div>
  );
}
