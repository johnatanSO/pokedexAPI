import react, { useState, useEffect } from "react";
import "./App.css";
import ListaContent from "./components/ListaContent/ListaContent";
import ModalContainer from "./components/ModalContainer/ModalContainer";
import services from './services'

function App() {
  const [pokedex, setPokedex] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [currentPokemonData, setCurrentPokemonData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    services.baseFetch(`/?offset=${currentPage}&limit=20`, setPokedex, setLoading, setTotalResults);
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

  async function showPoke(idPokemon) {
    const req = await fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`);
    const data = await req.json();
    setCurrentPokemonData(data);
    setShowModal(true);
  }

  function onHideModal(e) {
    if (e.target.id === "modalContainer") {
      setShowModal(false);
    }
  }

  return (
    <div className="mainPage">
      <header>
        <img src="https://crisgon.github.io/pokedex/src/images/logo.png" />
      </header>

      <ListaContent
        currentPage={currentPage}
        showPoke={showPoke}
        pokedex={pokedex}
        nextPage={nextPage}
        previousPage={previousPage}
      />
      <span style={{padding: "5px"}}>Total: {totalResults}</span>

      {loading && (
        <div className="loadingContent">
          <img src="/assets/images/loading.svg" />
        </div>
      )}

      {currentPokemonData != null && (
        <ModalContainer
          currentPokemonData={currentPokemonData}
          showModal={showModal}
          onHideModal={onHideModal}
        />
      )}
    </div>
  );
}

export default App;
