import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  render() {
    const allPlayersString = window.localStorage.getItem('allPlayers');
    const allPlayers = JSON.parse(allPlayersString);
    allPlayers.sort((a, b) => b.score - a.score);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {allPlayers.map((item, index) => {
          console.log(item);
          const hash = md5(item.gravatarEmail).toString();
          const urlGravatar = `https://www.gravatar.com/avatar/${hash}`;
          return (
            <div key={ index }>
              <img src={ urlGravatar } alt="avatar" />
              <p data-testid={ `player-name-${index}` }>
                {' '}
                { item.name }
                {' '}
              </p>
              <p data-testid={ `player-score-${index}` }>{ item.score }</p>
            </div>
          );
        })}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">Voltar ao início</button>
        </Link>
      </div>
    );
  }
}

export default Ranking;
