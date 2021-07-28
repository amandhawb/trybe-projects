import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from './Header';
import Timer from './Timer';
import * as actions from '../actions';

const ONE_SECOND = 1000;
const ONE = 1;
const THREE = 3;
const TWO = 2;
const FOUR = 4;
class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      questionIndex: 0,
      count: 30,
    };
    this.handleClickAndTimeOut = this.handleClickAndTimeOut.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.decrementCount = this.decrementCount.bind(this);
    this.handleCorrectAnswer = this.handleCorrectAnswer.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.decrementCount, ONE_SECOND);
  }

  handleClickAndTimeOut() {
    this.setState({
      answered: true,
    });
  }

  handleCorrectAnswer() {
    const { count, questionIndex } = this.state;
    const { questions: { allQuestions }, handleNewCorrectAnswer } = this.props;
    const currentQuestion = allQuestions[questionIndex];
    const initPoint = 10;
    let difficultyNumber;
    if (currentQuestion.difficulty === 'hard') {
      difficultyNumber = THREE;
    } else if (currentQuestion.difficulty === 'medium') {
      difficultyNumber = TWO;
    } else {
      difficultyNumber = ONE;
    }
    const score = (initPoint + (count * difficultyNumber));
    handleNewCorrectAnswer(score);
    this.setState({
      answered: true,
    });
  }

  decrementCount() {
    const { count } = this.state;

    if (count - 1 <= 0) {
      this.handleClickAndTimeOut();
      clearInterval(this.intervalId);
    }

    this.setState({ count: count - 1 });
  }

  handleNext() {
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      answered: false,
    }));
  }

  renderButtons() {
    const { questions: { allQuestions } } = this.props;
    const { answered, questionIndex } = this.state;
    const currentQuestion = allQuestions[questionIndex];
    const correctAnswerClassName = answered ? {
      border: '3px solid rgb(6, 240, 15)',
    } : {};
    const wrongAnswerClassName = answered ? {
      border: '3px solid rgb(255, 0, 0)',
    } : '';
    return (
      <div>
        <button
          disabled={ answered }
          style={ { ...correctAnswerClassName } }
          type="button"
          data-testid="correct-answer"
          onClick={ this.handleCorrectAnswer }
        >
          { currentQuestion.correct_answer }
        </button>
        {
          currentQuestion.incorrect_answers.map((item, index) => (
            <button
              disabled={ answered }
              style={ { ...wrongAnswerClassName } }
              type="button"
              key={ index }
              data-testid={ `wrong-answer${index}` }
              onClick={ this.handleClickAndTimeOut }
            >
              { item }
            </button>
          ))
        }
      </div>
    );
  }

  renderQuestions() {
    const { questions: { allQuestions } } = this.props;
    const { answered, questionIndex, count } = this.state;
    if (allQuestions.length === 0) {
      return null;
    }
    const currentQuestion = allQuestions[questionIndex];
    return (
      <div>
        <p data-testid="question-category">{ currentQuestion.category }</p>
        <p data-testid="question-text">{ currentQuestion.question }</p>
        {this.renderButtons()}
        { answered && questionIndex < FOUR && (
          <button type="button" data-testid="btn-next" onClick={ this.handleNext }>
            Próxima
          </button>)}

        { answered && questionIndex === FOUR && (
          <Link to="/feedback">
            <button
              type="button"
              data-testid="btn-next"

            >
              Próxima
            </button>
          </Link>
        )}
        { !answered && <Timer count={ count } /> }
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        { this.renderQuestions() }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleNewCorrectAnswer: (score) => dispatch(actions.handleNewCorrectAnswer(score)),
});

const mapStateToProps = (state) => ({
  questions: state.questions,
  token: state.player.token,
});

Game.propTypes = {
  handleNewCorrectAnswer: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    allQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
