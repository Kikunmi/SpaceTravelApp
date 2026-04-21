import React from 'react';
import Navigation from '../components/Navigation';
import styles from './Home.module.css';

const Home = () => (
  <div className={styles.home}>
    <Navigation />
    <h1>Welcome to Space Travel</h1>
    <p>Evacuate humankind from Earth. Manage spacecraft, planets, and interplanetary travel.</p>
    <ul>
      <li>View and manage all spacecraft</li>
      <li>Build new spacecraft and decommission old ones</li>
      <li>View planets and stationed spacecraft</li>
      <li>Send spacecraft between planets to transfer people</li>
    </ul>
  </div>
);

export default Home;
