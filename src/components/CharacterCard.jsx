
import React from "react";

const CharacterCard = (props) => {
  let character = props.character;
  /** Response Example
   * {
          "id": "1",
          "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
          "name": "Rick Sanchez",
          "species": "Human",
          "gender": "Male",
          "origin": {
            "name": "Earth (C-137)"
          },
          "location": {
            "dimension": "Replacement Dimension"
          },
          "status": "Alive"
        }
   */
  return (
    <div className="container">
      <img className="avatar" src={character.image} />
      <h2 className="name">{character.name}</h2>
      <div className="character-details">
        <p>{character.species}</p>
      </div>
    </div>
  );
}
export default CharacterCard;
