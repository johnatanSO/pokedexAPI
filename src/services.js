const baseURL = "https://pokeapi.co/api/v2/pokemon";

const services = {
  baseFetch: (endPoint, setPokedex, setLoading, setTotalResults) => {
    fetch(`${baseURL}${endPoint}`)
      .then((response) => response.json())
      .then((data) => {
        setPokedex(data.results);
        setTotalResults(data.count)
      })
      .finally(() => {
        setLoading(false);
      });
  }
}
export default services