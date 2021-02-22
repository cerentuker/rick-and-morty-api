import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./pages/App.jsx";

const initialState = {
  characters: [],
  favourites: []
}
function reducer(state = initialState, action) {
  switch (action.type) {
    case "fetchCharacters":
      return {
        characters: action.response
      };
    case "addToFavourites":
      return {
        favourites: state.favourites.push(action.newID)
      }
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "charactersFetched" })
store.dispatch({ type: "addToFavourites" })

const HotReloadableApp = hot(module)(App);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <HotReloadableApp />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
