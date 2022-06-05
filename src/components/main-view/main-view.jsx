import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import PropTypes from 'prop-types';



import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      user: null
      // selectedMovie: null,
      // registered: null
    };
  }

  getMovies(token) {
    axios.get('http://hallibentley-movie-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // onLoggedOut() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  //   this.setState({
  //     user: null
  //   });
  // }

  // setSelectedMovie(movie) {
  //   this.setState({
  //     selectedMovie: movie
  //   });
  // }

  // onRegister(registered) {
  //   this.setState({
  //     registered
  //   });
  // }



  // render() {
  //   const { movies, user } = this.state;

  //   if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

  //   if (movies.length === 0) return <div className="main-view" />;

  //   return (
  //     <React.Fragment>
  //       <Row className="main-view justify-content-md-center">
  //         {selectedMovie
  //           ? (
  //             <Col md={8}>
  //               <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
  //             </Col>
  //           )
  //           : movies.map(movie => (
  //             <Col md={3}>
  //               <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
  //             </Col>
  //           ))
  //         }
  //       </Row>
  //       <button onClick={() => { this.onLoggedOut() }}>Logout</button>
  //     </React.Fragment>
  //   );
  // }

  render() {
    const { movies, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={(/*welcome*/) => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />
          <Route exact path="/directors/:name" render={({ match }) => {
            if (movies.length === 0)
              return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            </Col>
          }} />
          <Route exact path="/genres/:name" render={({ match }) => {
            if (movies.length === 0)
              return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
            </Col>
          }} />
        </Row>
      </Router>
    );
  }

}