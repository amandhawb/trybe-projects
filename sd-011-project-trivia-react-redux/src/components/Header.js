import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { player: { email, name, score } } = this.props;
    const hash = md5(email).toString();
    const urlGravatar = `https://www.gravatar.com/avatar/${hash}`;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ urlGravatar } alt="avatar" />
        <span data-testid="header-player-name">{ name }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  player: state.player,
});

Header.propTypes = {
  player: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
