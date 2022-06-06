import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import PropTypes from 'prop-types';

import './movie-card.scss';

import { MovieView } from '../movie-view/movie-view';

export class MovieCard extends React.Component {

  render() {
    const { movie } = this.props;

    return (
      <Router>
        <Card>
          <Card.Img variant="top" src={movie.ImagePath} crossOrigin='anonymous' />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
              <Button variant="link">Open</Button>
            </Link>
            <Route path="/movies/:movieId" render={({ match, history }) => {
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Card.Body>
        </Card>
      </Router>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  })
    .isRequired,
  onMovieClick: PropTypes.func.isRequired
};