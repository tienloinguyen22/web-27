import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; 
import CreateGameScreen from './pages/CreateGameScreen';
import GameDetailScreen from './pages/GameDetailScreen';
import NotFoundScreen from './pages/NotFoundScreen';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={CreateGameScreen} exact={true} />
        <Route path='/games/:gameId' component={GameDetailScreen} />
        <Route component={NotFoundScreen} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
