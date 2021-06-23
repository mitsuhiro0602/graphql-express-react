import React, { useContext, Fragment } from 'react';
// import { auth } from '../firebase';
import firebase from '../firebase';
import { AuthContext } from '../context/authContext';
import { Link, useHistory, useParams} from 'react-router-dom';


const Nav = () => {
  const { state, dispatch } = useContext(AuthContext);
  let history = useHistory()

  const { user } = state;

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: null
    });
    history.push('/login');
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {user && (
            <li className="nav-item active">
              <Link className="nav-link" to="/profile">
                Profile
              </Link>
            </li>
          )}
          {!user && (
            <Fragment>
              <li className="nav-item active">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </Fragment>
          )}
          {user && (
            <li className="nav-item">
              <a onClick={logout} href="/login" className="nav-item nav-link">
                Logout
              </a>
            </li>
          )}
        </ul>
        <div className="ml-auto">
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Nav
