import React from "react";
import "./ListaContent.css";

function ListaContent(props) {
  return (
    <ul className="contentPokers">
      <div className="prevButton" onClick={props.previousPage}>
        <img src="/assets/images/arrow.png" />{" "}
      </div>
      <div className="nextButton" onClick={props.nextPage}>
        <img src="/assets/images/arrow.png" />
      </div>
      {props.pokedex.map((pokemon, index) => {
        return (
          <li
            onClick={() => {
              props.showPoke(props.currentPage + index + 1);
            }}
            key={props.currentPage + index + 1}
          >
            <img
              id={props.currentPage + index + 1}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
                props.currentPage + index + 1
              }.png`}
            />
            <h3>{pokemon.name}</h3>
          </li>
        );
      })}
    </ul>
  );
}

export default ListaContent;
