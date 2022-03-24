import react, { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [pokedex, setPokedex] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPokemonData, setCurrentPokemonData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${currentPage}&limit=20`)
      .then((response) => response.json())
      .then((data) => {
        setPokedex(data.results);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  function nextPage() {
    setCurrentPage(currentPage + 20);
  }
  function previousPage() {
    if (currentPage <= 0) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 20);
    }
  }

  function showPoke(idPokemon, e) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`)
      .then((response) => response.json())
      .then((data) => {
        setCurrentPokemonData(data);
      })
      .finally(() => {
        setShowModal(true);
      });
  }

  function onHideModal(e) {
    let target = e.target;
    if (target.id === "modalContainer") {
      setShowModal(false);
    }
  }

  return (
    <div className="mainPage">
      <header>
        <img src="https://crisgon.github.io/pokedex/src/images/logo.png" />
      </header>

      <ul className="contentPokers">
        <div className="prevButton" onClick={previousPage}>
          <img src="/assets/images/arrow.png" />{" "}
        </div>
        <div className="nextButton" onClick={nextPage}>
          <img src="/assets/images/arrow.png" />
        </div>
        {pokedex.map((pokemon, index) => {
          return (
            <li
              onClick={() => {
                showPoke(currentPage + index + 1);
              }}
              key={currentPage + index + 1}
            >
              <img
                id={currentPage + index + 1}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${
                  currentPage + index + 1
                }.png`}
              />
              <h3>{pokemon.name}</h3>
            </li>
          );
        })}
      </ul>

      <div className="buttonsContent"></div>
      {loading && (
        <div className="loadingContent">
          <img src="/assets/images/loading.svg" />
        </div>
      )}

      {currentPokemonData != null && (
        <div
          id="modalContainer"
          onClick={onHideModal}
          className={showModal ? "modalContainer showModal" : "modalContainer"}
        >
          <div className="modalContent">
            <div className="modalHeader">
              <h2>{currentPokemonData.name}</h2>

              <div>
                <h4 style={{ textTransform: "uppercase" }}>
                  {currentPokemonData.stats[0].stat.name} :{" "}
                  {currentPokemonData.stats[0].base_stat}{" "}
                </h4>

                <h4>
                  EXP:{" "}
                  {currentPokemonData != {} &&
                    currentPokemonData.base_experience}{" "}
                </h4>
              </div>
            </div>

            <div className="modalBody">
              <div
                className="imgContent"
                style={{ borderBottom: "1px solid grey" }}
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${currentPokemonData.id}.png`}
                />
              </div>

              <div className="listsStats">
                <ul className="baseAtributes">
                  <li style={{ color: "rgb(255, 72, 72)" }}>
                    Attack: {currentPokemonData.stats[1].base_stat}
                  </li>
                  <li style={{ color: "rgb(0, 123, 255)" }}>
                    Defense: {currentPokemonData.stats[2].base_stat}
                  </li>
                  <li style={{ color: "rgb(0, 184, 0)" }}>
                    Speed: {currentPokemonData.stats[5].base_stat}
                  </li>
                </ul>
                <ul className="specialAtributes">
                  <li style={{ color: "rgb(255, 72, 72)" }}>
                    Epecial attack: {currentPokemonData.stats[3].base_stat}
                  </li>
                  <li style={{ color: "rgb(0, 123, 255)" }}>
                    Epecial defense: {currentPokemonData.stats[4].base_stat}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
