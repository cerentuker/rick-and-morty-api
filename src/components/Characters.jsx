import React from "react";

import CharacterCard from "./CharacterCard";

const Characters = (props) => {
  return (
    <div className="cards">
      {props.characters.map((character) => <CharacterCard character={character} key={character.id} />)}
    </div>
  );
}

export default Characters;
