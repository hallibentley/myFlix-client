import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from 'axios';

import { connect } from 'react-redux';

import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

import './main-view.scss';

import { MenuBar } from '../navigation/navbar';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
// import { MovieCard } from '../movie-card/movie-card';


class MainView extends React.Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     user: null
  //   };
  // }

  getMovies(token) {
    axios.get('http://hallibentley-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getMovies(accessToken);
      this.props.setUser(localStorage.getItem('user'));
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    // const { setUser } = this.props;
    setUser(authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }

  render() {
    let { movies, user } = this.props;

    return (
      <Router>
        <MenuBar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">

            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }} />

            <Route exact path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView />
              </Col>
            }} />

            <Route exact path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route exact path="/movies/directors/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route exact path="/movies/genres/:name" render={({ match, history }) => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route exact path="/users/:username" render={({ history }) => {
              // if (!user) return <Redirect to="/" />
              return <Col>
                <ProfileView
                  user={user}
                  history={history}
                  movies={movies}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);