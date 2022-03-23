import react, {useState, useEffect} from 'react';
import './App.css'
function App() {
  const [pokedex, setPokedex] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
 
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

  return (
    <div className="mainPage">
      <h1>Pokedex</h1>
      <ul>
        {pokedex.map((pokemon, index) => {
          return (<li key={index}>{pokemon.name}</li>)
        })}
      </ul>

      <div className="buttonsContent">
        <button onClick={previousPage}>Voltar</button>
        <button onClick={nextPage}>Avançar</button>
      </div>
      {loading && 
        <div className="loadingContent">
          <img src="/assets/images/loading.svg" />
        </div>
      }
    </div>
    
  );
}

export default App;
