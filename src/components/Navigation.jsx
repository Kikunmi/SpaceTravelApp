import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => (
  <nav className={styles.navigation}>
    <Link to="/">Home</Link>
    <Link to="/spacecrafts">Spacecrafts</Link>
    <Link to="/planets">Planets</Link>
  </nav>
);

export default Navigation;
