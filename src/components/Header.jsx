import { Link } from 'react-router-dom';

const Header = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">Movie Browser</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;
