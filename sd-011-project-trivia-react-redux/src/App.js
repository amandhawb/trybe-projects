import React from 'react';
import { Route, Switch } from 'react-router';

import Login from './components/Login';
import Game from './components/Game';
import Settings from './components/Settings';
import Ranking from './components/Ranking';
import Feedback from './components/Feedback';

import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
