import React from "react";
import "./ModalContainer.css";

function ModalContainer(props) {
  return (
    <div
      id="modalContainer"
      onClick={props.onHideModal}
      className={
        props.showModal ? "modalContainer showModal" : "modalContainer"
      }
    >
      <div className="modalContent">
        <div className="modalHeader">
          <h2>{props.currentPokemonData.name}</h2>

          <div>
            <h4 style={{ textTransform: "uppercase" }}>
              {props.currentPokemonData.stats[0].stat.name} :{" "}
              {props.currentPokemonData.stats[0].base_stat}{" "}
            </h4>

            <h4>
              EXP:{" "}
              {props.currentPokemonData != {} &&
                props.currentPokemonData.base_experience}{" "}
            </h4>
          </div>
        </div>

        <div className="modalBody">
          <div
            className="imgContent"
            style={{ borderBottom: "1px solid grey" }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${props.currentPokemonData.id}.png`}
            />
          </div>

          <div className="listsStats">
            <ul className="baseAtributes">
              <li style={{ color: "rgb(255, 72, 72)" }}>
                Attack: {props.currentPokemonData.stats[1].base_stat}
              </li>
              <li style={{ color: "rgb(0, 123, 255)" }}>
                Defense: {props.currentPokemonData.stats[2].base_stat}
              </li>
              <li style={{ color: "rgb(0, 184, 0)" }}>
                Speed: {props.currentPokemonData.stats[5].base_stat}
              </li>
            </ul>
            <ul className="specialAtributes">
              <li style={{ color: "rgb(255, 72, 72)" }}>
                Epecial attack: {props.currentPokemonData.stats[3].base_stat}
              </li>
              <li style={{ color: "rgb(0, 123, 255)" }}>
                Epecial defense: {props.currentPokemonData.stats[4].base_stat}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalContainer;
