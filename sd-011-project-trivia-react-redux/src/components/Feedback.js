import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import * as actions from '../actions';

const THREE = 3;
class Feedback extends Component {
  componentDidMount() {
    const allPlayers = window.localStorage.getItem('allPlayers');
    const currentPlayer = JSON.parse(window.localStorage.getItem('state'));
    if (allPlayers === null) {
      const arrayAllPlayers = [];
      arrayAllPlayers.push(currentPlayer.player);
      window.localStorage.setItem('allPlayers', JSON.stringify(arrayAllPlayers));
    } else {
      const arrayAllPlayers = JSON.parse(allPlayers);
      arrayAllPlayers.push(currentPlayer.player);
      window.localStorage.setItem('allPlayers', JSON.stringify(arrayAllPlayers));
    }
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { score, assertions } = state.player;
    const { resetGame } = this.props;
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">Testando</p>
        <h3 data-testid="feedback-text">
          {
            (assertions >= (THREE))
              ? 'Mandou bem!'
              : 'Podia ser melhor...'
          }
        </h3>
        <h4 data-testid="feedback-total-score">{ score }</h4>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
        <div>
          <Link onClick={ resetGame } to="/">
            <button data-testid="btn-play-again" type="button">Jogar novamente</button>
          </Link>
          <Link onClick={ resetGame } to="/ranking">
            <button type="button" data-testid="btn-ranking">
              Ver Ranking
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(actions.resetGame()),
});

Feedback.propTypes = {
  resetGame: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
