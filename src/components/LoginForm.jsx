import React, { useState } from "react";
import axios from 'axios';
import { useAppContext } from "../libs/contextLib";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "../pages/App.css";

export default function LoginForm() {
  const [loginUserName, setLoginUserName] = useState("");
  const [favourites, setFavourites] = useState("");
  const { authenticateUser } = useAppContext();

  function validateForm() {
    return loginUserName && loginUserName.length > 0;
  }
  // check if username already taken
  function doesUserExist() {
    return axios
      .get('http://localhost:4001/users/find', {
        params: {
          userName: loginUserName
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(error => console.error(`There was an error checking the availability of ${loginUserName} as username: ${error}`))
  }

  // Get favourites for user
  function getFavourites() {
    return axios
      .get('http://localhost:4001/users/getFavourites', {
        userName: loginUserName
      })
      .then(res => {
        console.log('ceren favs arama sonucu');
        console.log(JSON.stringify(res.data));
        console.log(res.data.length);
        console.log(res.data);
      })
      .catch(error => console.error(`There was an error getting the favourites for ${loginUserName}: ${error}`))
  }

  // Create new user
  const createUser = () => {
    axios
      .post('http://localhost:4001/users/create', {
        userName: loginUserName
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.error(`There was an error creating the ${loginUserName} user: ${error}`))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    doesUserExist().then(userData => {
      if (userData.length > 0) {
        getFavourites().then(favourites => {
          if (favourites.length > 0) {
            setFavourites(favourites);
          }
        })
        if (favourites && favourites.length > 0) {
          alert('favs found! user exists!');
        }
        authenticateUser(loginUserName);
      } else {
        console.log('new user!');
        createUser();
        authenticateUser(loginUserName);
      }
    });

    /* let userFavourites = signIn(userName);
    getFavourites(userFavourites); */
    /*
    try {
      await signIn(email, password);
      alert("Logged in");
    } catch (e) {
      alert(e.message);
    } */
  }

  return (
    <div className="login-container">
      <div className="lander">
        <h1>Welcome</h1>
        <p className="text-muted">We will check out some rick & morty characters, step inside :)</p>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            value={loginUserName}
            onChange={(e) => setLoginUserName(e.target.value)}
          />
        </Form.Group>
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login / Register
      </Button>
      </Form>
    </div>
  )
}
