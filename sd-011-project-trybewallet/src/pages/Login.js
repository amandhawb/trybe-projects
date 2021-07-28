import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import * as actions from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleSubmit() {
    const { handleLogin } = this.props;
    const { email } = this.state;
    handleLogin(email);
    this.setState({ shouldRedirect: true });
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;
    const SIX = 6;
    const validEmail = 'alguem@email.com';
    if (email === validEmail && password.length >= SIX) {
      return true;
    }
    return false;
  }

  handleEmail(event) {
    this.setState({
      email: event.target.value,
    });
  }

  handlePassword(event) {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    const isEnabled = this.validateEmailAndPassword();
    const { email, password, shouldRedirect } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <div>
        <label htmlFor="email">
          Email:
          <input
            id="email"
            type="text"
            name="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleEmail }
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            name="password"
            data-testid="password-input"
            value={ password }
            onChange={ this.handlePassword }
          />
        </label>
        <button disabled={ !isEnabled } type="button" onClick={ this.handleSubmit }>
          Entrar
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(actions.handleLogin(email)),
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
