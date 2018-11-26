import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import styles from './Header.scss';

const Header = ({ location }) => (
  <header className={styles.wrapper}>
    <NavLink
      to="/"
      className={styles.item}
      isActive={() => location.pathname === '/'}
      activeClassName={styles.active}
    >
      LINK 1
    </NavLink>
    <NavLink
      to="/bar"
      className={styles.item}
      isActive={() => location.pathname === '/bar'}
      activeClassName={styles.active}
    >
      LINK 2
    </NavLink>
  </header>
);

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Header);
