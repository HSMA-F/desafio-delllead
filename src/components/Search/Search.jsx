import React from "react";
import axios from "axios";
import Cards from "..//Card/Card";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import "./Search.css";

const Search = () => {
  var [pesquisa, setPesquisa] = React.useState("");
  var [filmes, setFilmes] = React.useState([]);
  var [categoria, setCategoria] = React.useState("");
  var pag;

  const handleChange = (event) => {
    setCategoria(event.target.value,setCategoria);
    console.log(categoria);
  };

  function maisPopulares(e) {
    e.preventDefault();
    pag = 1;
    axios(
      "https://api.themoviedb.org/3/movie/popular?api_key=662c3c7bb9219930e7416f346609f462&language=pt-BR&page=" +
        pag
    ).then((res) => setFilmes(res.data.results));
  }

  function menosPopulares(e) {
    e.preventDefault();
    pag = 500;
    axios(
      "https://api.themoviedb.org/3/movie/popular?api_key=662c3c7bb9219930e7416f346609f462&language=pt-BR&page=" +
        pag
    ).then((res) => setFilmes(res.data.results));
  }
  function pesquisaCategoria(e) {
    axios(
      "https://api.themoviedb.org/3/discover/movie?api_key=662c3c7bb9219930e7416f346609f462&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
        categoria +
        "&with_watch_monetization_types=flatrate"
    ).then((res) => setFilmes(res.data.results));
  }
  function onPesquisaChange(e) {
    setPesquisa(e.target.value);
    pesquisaFilme(e)
  }
  function pesquisaFilme(e) {
    e.preventDefault();
    const nome = pesquisa;
    axios(
      "https://api.themoviedb.org/3/search/movie?api_key=662c3c7bb9219930e7416f346609f462&language=pt-BR&query=" +
        nome
    ).then((res) => setFilmes(res.data.results));
  }
  return (
    <div className="header">

      <div className="search">
        <div className="pesquisa">
          <TextField
            className="textField"
            id="outlined-basic"
            label="Pesquisar"
            onChange={onPesquisaChange}
            />
        </div>
        <div className="genero">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">G??nero</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={categoria}
              label="G??nero"
              onChange={handleChange}
              >
              <MenuItem value=""></MenuItem>
              <MenuItem value={28}>A????o</MenuItem>
              <MenuItem value={12}>Aventura</MenuItem>
              <MenuItem value={16}>Anima????o</MenuItem>
              <MenuItem value={35}>Com??dia</MenuItem>
              <MenuItem value={80}>Crime</MenuItem>
              <MenuItem value={99}>Document??rio</MenuItem>
              <MenuItem value={18}>Drama</MenuItem>
              <MenuItem value={10751}>Fam??lia</MenuItem>
              <MenuItem value={14}>Fantasia</MenuItem>
              <MenuItem value={36}>Hist??ria</MenuItem>
              <MenuItem value={27}>Terror</MenuItem>
              <MenuItem value={10402}>M??sica</MenuItem>
              <MenuItem value={9648}>Mist??rio</MenuItem>
              <MenuItem value={10749}>Romance</MenuItem>
              <MenuItem value={878}>Fic????o cient??fica</MenuItem>
              <MenuItem value={10770}>Cinema TV</MenuItem>
              <MenuItem value={53}>Thriller</MenuItem>
              <MenuItem value={10752}>Guerra</MenuItem>
              <MenuItem value={37}>Faroeste</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" onClick={pesquisaCategoria}>
            Filtrar g??nero
          </Button>
        </div>
        <div className="populares">
          <Button variant="outlined" onClick={maisPopulares}>
            + Populares
          </Button>
          <Button variant="outlined" onClick={menosPopulares}>
            - Populares
          </Button>
        </div>
      </div>
      <div className="cards">
        {filmes.map((item) => (
          <Cards
          title={item.title}
          poster={item.poster_path}
          rating={item.vote_average}
          sinopse={item.overview}
          />
          ))}
      </div>
    </div>
  );
};

export default Search;
