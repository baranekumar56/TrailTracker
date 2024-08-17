import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1>Welcome to Walmart Trailer Management</h1>
      <p>Manage trailers efficiently between distribution centers, fulfillment centers, and stores.</p>
      <Link to="/login" style={styles.button}>Get Started</Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '100px',
    padding: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0071ce',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
  }
};

export default HomePage;
