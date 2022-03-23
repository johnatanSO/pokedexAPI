import react, {useState, useEffect} from 'react';
import './App.css'
function App() {
  const [pokedex, setPokedex] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [currentPokemonData, setCurrentPokemonData] = useState({})
  const [showModal,setShowModal] = useState(false)
 
useEffect(() =>{
  fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${currentPage}&limit=20`).then(response => response.json())
  .then((data) => {
    setPokedex(data.results)
  })
  .finally(() =>{setLoading(false)})
  
}, [currentPage])

console.log(pokedex)


function nextPage(){
  setCurrentPage(currentPage + 20)
}
function previousPage(){
  if(currentPage <= 0){
    setCurrentPage(0)
  }else{
    setCurrentPage(currentPage - 20)
  }
}



function showPoke(idPokemon, e){
  
  console.log(idPokemon)
  fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`).then(response => response.json()).then((data) => {setCurrentPokemonData(data)}).finally(()=>{setShowModal(true)})
}
console.log(currentPokemonData)

  return (
    <div className="mainPage">
      <header>
        <img src="https://crisgon.github.io/pokedex/src/images/logo.png"/>
      </header>
      
      <ul>
        <div className="prevButton" onClick={previousPage}><img src="/assets/images/arrow.png"/> </div>
        <div className="nextButton" onClick={nextPage}><img src="/assets/images/arrow.png"/></div>
        {pokedex.map((pokemon, index) => {
          return (
          <li onClick={() => {showPoke((currentPage+index) + 1)}} key={(currentPage+index) +1}>
            <img id={(currentPage+index) + 1} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${(currentPage+index) +1}.png`} />
            <h3>{pokemon.name}</h3>
          </li>)
        })}
      </ul>

      <div className="buttonsContent">
        
      </div>
      {loading && 
        <div className="loadingContent">
          <img src="/assets/images/loading.svg" />
        </div>
      }

      <div className={showModal? "modalContainer" : ""}>
        <div className="modalContent">

          <div className="modalHeader">
            <h2>{currentPokemonData.name}</h2>
          </div>

          <div className="modalBody">
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${currentPokemonData.id}.png`} />
          </div>

        </div>
      </div>

    </div>
    
  );
}

export default App;
