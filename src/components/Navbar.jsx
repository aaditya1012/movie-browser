import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#333',
        color: '#fff',
      }}
    >
      <h1 style={{ margin: 0 }}>🎬 Movie Browser</h1>
      <div>
        <Link
          to="/"
          style={{
            margin: '0 10px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Home
        </Link>
        <Link
          to="/favorites"
          style={{
            margin: '0 10px',
            textDecoration: 'none',
            color: 'white',
          }}
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
