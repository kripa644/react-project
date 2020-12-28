import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import Home from './pages/Home';
import Favorites from './pages/Favorite';
import RecentItems from './pages/Recent';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SearchItem from './components/SearchItem/SearchItem';
import { useGlobalContext } from "./components/context";

function App() {
  const {setSelectedNavItem, setWeather} = useGlobalContext();

  return (
    <div className='app'>
      <div className='app-container'>
        <Router>
          <Link to='/' onClick={() => {
            setSelectedNavItem(0);
            setWeather({data: ''});
          }}>
            <SearchItem/>
          </Link>
          <NavBar/>
          <div className='line'></div>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route path="/favorites">
              <Favorites/>
            </Route>
            <Route path="/recent">
              <RecentItems/>
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;