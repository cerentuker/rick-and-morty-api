import React from 'react';
import { connect } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import { useAppContext } from "../libs/contextLib";
import Button from 'react-bootstrap/Button';
import Characters from '../components/Characters';
const QUERY_FOR_PICKLE_RICK = gql`
query {
  characters(page: 1) {
    info {
      count
    }
    results {
      id
      image
      name
      species
      gender
      origin {
    		name
  		}
      location {
        dimension
      }
			status
    }
  }
  location(id: 1) {
    id
  }
  episodesByIds(ids: [1, 2]) {
    id
  }
}`;

function Dashboard() {
  const { userName, authenticateUser } = useAppContext();
  const { loading, error, data } = useQuery(QUERY_FOR_PICKLE_RICK);
  const dispatch = useDispatch();

  if (loading)
    return <p>Loading...</p>;

  if (error || !data || !data.characters || !data.characters.results.length > 0)
    return <p>Error :(</p>;

  const { characters: { results } } = data;

  dispatch({
    type: "fetchCharacters"
  });

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
      <Characters characters={results} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  characters: state.results
});

export default connect(mapStateToProps)(Dashboard);
