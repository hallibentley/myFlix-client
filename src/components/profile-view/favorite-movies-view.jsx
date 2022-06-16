import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import './profile-view.scss';

export function FavoriteMoviesView(props) {
  const { movies, favoriteMovies, currentUser, currentToken } = props;
  const favoriteMoviesList = movies.filter(m => {
    return favoriteMovies.includes(m._id)
  })

  const handleMovieDelete = (movieId) => {
    axios.delete(`https://hallibentley-movie-api.herokuapp.com/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${currentToken}` }
    })
      .then(() => {
        alert(`The movie was successfully deleted.`)
        window.open('/users/:username', '_self');
      }).
      catch(error => console.error(error))
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          {favoriteMoviesList.length === 0 ? (
            <p>Your favorites list is empty!</p>
          ) : (
            favoriteMoviesList.map((movie) => {
              return (
                <Col md={3} key={movie._id}>
                  <Card id="movie-card">
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Img src={movie.ImagePath} crossOrigin='anonymous' />
                    </Link>
                    <Card.Body>
                      <Card.Title>{movie.Title}</Card.Title>
                      <Link to={`/movies/${movie._id}`}>
                        <Button>Open</Button>
                      </Link>
                      <Button
                        onClick={() => { handleMovieDelete(movie._id) }} >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            })
          )
          }
        </Row>
      </Container>

    </React.Fragment >
  )
}