import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import ListPage from './pages/ListPage/ListPage';
import FavoritePage from './pages/FavoritePage/FavoritePage';
import DetailPage from './pages/DetailPage/DetailPage';
import SearchPage from './pages/SearchPage/SearchPage';
import { useState, useMemo } from 'react';
import FavouriteContext from './LocaleContext';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import History from './History'
import { useEffect } from 'react';
import RickAndMorty from './video/bg.mp4'


function App() {
  const [favoritos, setFavoritos] = useState([])
  const [input, setInput] = useState("")
  
  const providerFavoritos = useMemo(()=>({favoritos, setFavoritos}),[favoritos, setFavoritos])

  useEffect(()=>{

  },[input])

  const searchAction = (e)=>{
    e.preventDefault()
    
    History.push("/search/"+input)
    
    setInput('')
  };
  return (
    <Router history={History}>
      <video autoPlay loop muted>
        <source src = {RickAndMorty} type = "video/mp4"/>
      </video>
      <Navbar bg="light" expand="lg"> 
        <Nav.Link>
          <Link to={"/"}>
            Home
          </Link>
        </Nav.Link>   
        <Nav.Link>
          <Link to={"/favorites"}>
            Favoritos
          </Link>
        </Nav.Link>
        <Nav.Link>
          <Link to={"/search"}>
            Search
          </Link>
        </Nav.Link>
      </Navbar>
      
      <FavouriteContext.Provider value={providerFavoritos}>
      <Switch>
          <Route path="/character/:id">
            <DetailPage/>
          </Route>
          <Route path="/search">
            <SearchPage/>
          </Route>
          <Route path="/favorites">
            <FavoritePage/>
          </Route>
        <Route path="/">
          <ListPage/>
          </Route>
      </Switch>
      </FavouriteContext.Provider>
    </Router>
  );
}

export default App;
// https://www.youtube.com/watch?v=p3coPygJ8ws
