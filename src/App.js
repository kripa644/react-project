import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home';
import Favorites from './pages/Favorite';
import RecentItems from './pages/Recent';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import SearchItem from './components/SearchItem/SearchItem';

const logoUrl = './logo.png';

function App() {
  
  return (
    <div className='app'>
      <div className='app-container'>
        <Router>
          <SearchItem/>
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