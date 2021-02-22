import React, { Component } from "react";
import { useQuery, gql } from '@apollo/client';

// import "./PickleRick.css";
import CharacterCard from "./CharacterCard";

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

const Characters = () => {
  const { loading, error, data } = useQuery(QUERY_FOR_PICKLE_RICK);

  if (loading)
    return <p>Loading...</p>;

  if (error || !data || !data.characters || !data.characters.results.length > 0)
    return <p>Error :(</p>;

  const { characters: { results } } = data;
  // const { name, image } = results[0];

  return (
    <div className="cards">
      {results.map((character) => <CharacterCard character={character} key={character.id} />)}
    </div>
  );
}

export default Characters;
